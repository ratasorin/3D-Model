import { AtomicBlockUtils, EditorState } from 'draft-js';
import { Dispatch, SetStateAction } from 'react';

const confirmMedia = (
  url: string,
  filename: string,
  editorState: EditorState,
  setEditorState: Dispatch<SetStateAction<EditorState>>
) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    'image',
    'IMMUTABLE',
    { src: url, filename }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });

  setEditorState(
    AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
  );
};

export default confirmMedia;
