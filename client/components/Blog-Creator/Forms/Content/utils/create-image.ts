import { AtomicBlockUtils, EditorState } from 'draft-js';
import {
  fromEvent,
  map,
  throwError,
  takeUntil,
  switchMap,
  concat,
  mergeMap,
  combineLatest,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

const srcFromFile = (file: File) => {
  const reader = new FileReader();
  return fromEvent(reader, 'loadend', () => reader.result as string).pipe(
    takeUntil(fromEvent(reader, 'error').pipe(switchMap(throwError)))
  );
};

export async function* createMedia(
  editorState: EditorState,
  file: File,
  base_url: string
) {
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

  yield stateWithAtomicBlock;

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
  yield newEditorState;
}
