import { AtomicBlockUtils, EditorState } from 'draft-js';
import { UploadInfo } from 'types/server';

const srcFromFile = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const typeFromMime = (fileType: string) => {
  console.log(fileType);
  if (fileType.includes('pdf')) return 'pdf';
  if (fileType.includes('image')) return 'image';
  if (fileType.includes('video')) return 'video';
};
export async function* createMedia(
  editorState: EditorState,
  file: File,
  base_url: string
) {
  console.log('THE BASE URL IS:', base_url);
  const contentState = editorState.getCurrentContent();
  const src = await srcFromFile(file);
  const contentStateWithEntity = contentState.createEntity(
    'image',
    'IMMUTABLE',
    { src, type: typeFromMime(file.type) }
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

  yield stateWithAtomicBlock;

  const form = new FormData();

  form.append(base_url, file);
  const { url } = await fetch('/api/images/images', {
    method: 'POST',
    body: form,
  }).then(async (response) => {
    const { mimetype } = (await response.json()) as UploadInfo;
    return {
      url: `/api/images/${base_url}/${file.name}`,
      mimetype,
    };
  });

  const renewedEntity = stateWithAtomicBlock
    .getCurrentContent()
    .replaceEntityData(entityKey, {
      src: url,
      type: typeFromMime(file.type),
    });
  const newEditorState = EditorState.set(stateWithAtomicBlock, {
    currentContent: renewedEntity,
  });
  yield newEditorState;
}
