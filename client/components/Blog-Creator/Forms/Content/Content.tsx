import React, {
  ChangeEvent,
  useRef,
  useState,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import {
  AtomicBlockUtils,
  Editor,
  EditorState,
  RichUtils,
  getVisibleSelectionRect,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { closePopup, openPopup } from 'store/widgets/actions/popup-actions';
import { styles } from './style';
import mediaBlockRenderer from '../Media/Media';

function MediaEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showURLInput, setShowURLInput] = useState(false);
  const [url, setUrl] = useState('');
  const [urlType, setUrlType] = useState('');

  const promptForMedia = (type: 'audio' | 'video' | 'image') => {
    setUrlType(type);
    setShowURLInput(true);
  };
  const editorRef = useRef<Editor>(null);

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const focus = () => {
    editorRef.current?.focus();
  };

  //
  const SelectedText = (newEditorState: EditorState) => {
    const selectionState = newEditorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = newEditorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const selectedText = currentContentBlock.getText().slice(start, end);
    return selectedText;
  };
  //

  const onChange = (newEditorState: EditorState) => {
    if (SelectedText(newEditorState).length) {
      if (getVisibleSelectionRect(window)) {
        const { left, top, height, width } = getVisibleSelectionRect(window);
        if (left & top)
          openPopup('simple-popup', {
            x: left + width / 2,
            y: top - height / 2,
          });
      }
    } else closePopup('simple-popup');
    setEditorState(newEditorState);
  };
  const onURLChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUrl(e.target.value);
  const addAudio = () => {
    promptForMedia('audio');
  };
  const addVideo = () => {
    promptForMedia('video');
  };
  const addImage = () => {
    promptForMedia('image');
  };

  const confirmMedia = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      urlType,
      'IMMUTABLE',
      { src: url }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
    );

    setShowURLInput(false);
    setUrl('');
  };
  const onURLInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 13) {
      confirmMedia(e as unknown as MouseEvent<HTMLButtonElement>);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const PictureInput = (
    <div style={styles.urlInputContainer}>
      <input
        onChange={onURLChange}
        ref={inputRef}
        style={styles.urlInput}
        type="picture"
        value={url}
        onKeyDown={onURLInputKeyDown}
      />
      <button onMouseDown={confirmMedia}>Confirm</button>
    </div>
  );

  return (
    <>
      <div style={styles.buttons}></div>
      <div style={styles.editor} onClick={focus}>
        <Editor
          blockRendererFn={mediaBlockRenderer}
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          placeholder="Enter some text..."
          ref={editorRef}
        />
      </div>
    </>
  );
}

export default MediaEditor;
