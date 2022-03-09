import { AtomicBlockUtils, EditorState } from 'draft-js';
import { Dispatch, SetStateAction } from 'react';

const srcFromFile = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const confirmMedia = async (
  editorState: EditorState,
  setEditorState: Dispatch<SetStateAction<EditorState>>,
  file: File,
  base_url: string
) => {
  const contentState = editorState.getCurrentContent();
  const src = await srcFromFile(file);
  const contentStateWithEntity = contentState.createEntity(
    'image',
    'IMMUTABLE',
    { src }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const stateWithEntity = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });

  const stateWithAtomicBlock = AtomicBlockUtils.insertAtomicBlock(
    stateWithEntity,
    entityKey,
    ' '
  );

  setEditorState(stateWithAtomicBlock);

  const form = new FormData();

  form.append(base_url, file);
  const { url } = await fetch('/api/images/images', {
    method: 'POST',
    body: form,
  }).then(() => ({
    url: `/api/images/${base_url}/${file.name}`,
  }));

  const renewedEntity = stateWithAtomicBlock
    .getCurrentContent()
    .replaceEntityData(entityKey, {
      src: url,
    });
  const newEditorState = EditorState.set(stateWithAtomicBlock, {
    currentContent: renewedEntity,
  });
  setEditorState(newEditorState);
};

export default confirmMedia;
