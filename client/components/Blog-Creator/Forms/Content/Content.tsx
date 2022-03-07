import React, { useEffect, useRef, useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { styles } from './style';
import mediaBlockRenderer from '../Media/Media';
import url$ from 'lib/text-editor-image-uploader';
import showStyleForText from './utils/editor-style-options';
import confirmMedia from './utils/create-image';

function MediaEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef<Editor>(null);
  useEffect(() => {
    url$.subscribe(async ({ url, filename }) => {
      confirmMedia(url, filename, editorState, setEditorState);
    });
  });

  const onChange = (newEditorState: EditorState) => {
    showStyleForText(newEditorState, setEditorState);
  };

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

  return (
    <>
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
