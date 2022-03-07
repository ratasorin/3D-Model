import React, {
  ChangeEvent,
  useRef,
  useState,
  KeyboardEvent,
  MouseEvent,
  FC,
  useEffect,
} from 'react';
import {
  AtomicBlockUtils,
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  ContentBlock,
  ContentState,
  getVisibleSelectionRect,
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { closePopup, openPopup } from 'store/widgets/actions/popup-actions';
import { fromEvent, take } from 'rxjs';
import { open } from 'components/Widgets/Popup/Simple/simple-slice';
import { addWidget } from 'components/Widgets/stack-slice';

// function MyEditor() {
//   const [editorState, setEditorState] = React.useState(() =>
//     EditorState.createEmpty()
//   );

//   const boldSelection = () => {
//     setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
//   };

//   return (
//     <div>
//       <button onClick={boldSelection}> B </button>
//       <Editor editorState={editorState} onChange={setEditorState} />;
//     </div>
//   );
// }

const styles = {
  root: {
    fontFamily: "'Georgia', serif",
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: "'Georgia', serif",
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  media: {
    width: '100%',
    // Fix an issue with Firefox rendering video controls
    // with 'pre-wrap' white-space
    whiteSpace: 'initial',
  },
};

function mediaBlockRenderer(block: ContentBlock) {
  if (block.getType() === 'atomic') {
    return {
      component: Media,
      editable: false,
    };
  }

  return null;
}

const Audio: FC<{ src: string }> = ({ src }) => {
  return <audio controls src={src} style={styles.media} />;
};

const Image: FC<{ src: string }> = ({ src }) => {
  return <img src={src} style={styles.media} />;
};

const Video: FC<{ src: string }> = ({ src }) => {
  return <video controls src={src} style={styles.media} />;
};

const Media: FC<{ block: ContentBlock; contentState: ContentState }> = ({
  block,
  contentState,
}) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media = null;
  if (type === 'audio') {
    media = <Audio src={src} />;
  } else if (type === 'image') {
    media = <Image src={src} />;
  } else if (type === 'video') {
    media = <Video src={src} />;
  }
  return media;
};

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

  const Input = (
    <div style={styles.urlInputContainer}>
      <input
        onChange={onURLChange}
        ref={inputRef}
        style={styles.urlInput}
        type="text"
        value={url}
        onKeyDown={onURLInputKeyDown}
      />
      <button onMouseDown={confirmMedia}>Confirm</button>
    </div>
  );

  return (
    <div style={styles.root}>
      <div style={{ marginBottom: 10 }}>
        Use the buttons to add audio, image, or video.
      </div>
      <div style={{ marginBottom: 10 }}>
        Here are some local examples that can be entered as a URL:
        <ul>
          <li>media.mp3</li>
          <li>media.png</li>
          <li>media.mp4</li>
        </ul>
      </div>
      <div style={styles.buttons}>
        <button onMouseDown={addAudio} style={{ marginRight: 10 }}>
          Add Audio
        </button>
        <button onMouseDown={addImage} style={{ marginRight: 10 }}>
          Add Image
        </button>
        <button onMouseDown={addVideo} style={{ marginRight: 10 }}>
          Add Video
        </button>
      </div>
      {showURLInput ? Input : null}
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
      <input style={styles.button} type="button" value="Log State" />
    </div>
  );
}

// class MediaEditorExample extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       editorState: EditorState.createEmpty(),
//       showURLInput: false,
//       url: '',
//       urlType: '',
//     };

//     this.focus = () => this.refs.editor.focus();
//     this.logState = () => {
//       const content = this.state.editorState.getCurrentContent();
//       console.log(convertToRaw(content));
//     };
//     this.onChange = (editorState) => this.setState({ editorState });
//     this.onURLChange = (e) => this.setState({ urlValue: e.target.value });

//     this.addAudio = this._addAudio.bind(this);
//     this.addImage = this._addImage.bind(this);
//     this.addVideo = this._addVideo.bind(this);
//     this.confirmMedia = this._confirmMedia.bind(this);
//     this.handleKeyCommand = this._handleKeyCommand.bind(this);
//     this.onURLInputKeyDown = this._onURLInputKeyDown.bind(this);
//   }

//   _handleKeyCommand(command, editorState) {
//     const newState = RichUtils.handleKeyCommand(editorState, command);
//     if (newState) {
//       this.onChange(newState);
//       return true;
//     }
//     return false;
//   }

//   _confirmMedia(e) {
//     e.preventDefault();
//     const { editorState, urlValue, urlType } = this.state;
//     const contentState = editorState.getCurrentContent();
//     const contentStateWithEntity = contentState.createEntity(
//       urlType,
//       'IMMUTABLE',
//       { src: urlValue }
//     );
//     const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//     const newEditorState = EditorState.set(editorState, {
//       currentContent: contentStateWithEntity,
//     });

//     this.setState(
//       {
//         // The third parameter here is a space string, not an empty string
//         // If you set an empty string, you will get an error: Unknown DraftEntity key: null
//         editorState: AtomicBlockUtils.insertAtomicBlock(
//           newEditorState,
//           entityKey,
//           ' '
//         ),
//         showURLInput: false,
//         urlValue: '',
//       },
//       () => {
//         setTimeout(() => this.focus(), 0);
//       }
//     );
//   }

//   _onURLInputKeyDown(e) {
//     if (e.which === 13) {
//       this._confirmMedia(e);
//     }
//   }

//   _addAudio() {
//     this._promptForMedia('audio');
//   }

//   _addImage() {
//     this._promptForMedia('image');
//   }

//   _addVideo() {
//     this._promptForMedia('video');
//   }

//   render() {
//     let urlInput;
//     if (this.state.showURLInput) {
//       urlInput = (
//         <div style={styles.urlInputContainer}>
//           <input
//             onChange={this.onURLChange}
//             ref="url"
//             style={styles.urlInput}
//             type="image"
//             value={this.state.urlValue}
//             onKeyDown={this.onURLInputKeyDown}
//           />
//           <button onMouseDown={this.confirmMedia}>Confirm</button>
//         </div>
//       );
//     }

//     return (
//       <div style={styles.root}>
//         <div style={{ marginBottom: 10 }}>
//           Use the buttons to add audio, image, or video.
//         </div>
//         <div style={{ marginBottom: 10 }}>
//           Here are some local examples that can be entered as a URL:
//           <ul>
//             <li>media.mp3</li>
//             <li>media.png</li>
//             <li>media.mp4</li>
//           </ul>
//         </div>
//         <div style={styles.buttons}>
//           <button onMouseDown={this.addAudio} style={{ marginRight: 10 }}>
//             Add Audio
//           </button>
//           <button onMouseDown={this.addImage} style={{ marginRight: 10 }}>
//             Add Image
//           </button>
//           <button onMouseDown={this.addVideo} style={{ marginRight: 10 }}>
//             Add Video
//           </button>
//         </div>
//         {urlInput}
//         <div style={styles.editor} onClick={this.focus}>
//           <Editor
//             blockRendererFn={mediaBlockRenderer}
//             editorState={this.state.editorState}
//             handleKeyCommand={this.handleKeyCommand}
//             onChange={this.onChange}
//             placeholder="Enter some text..."
//             ref="editor"
//           />
//         </div>
//         <input
//           onClick={this.logState}
//           style={styles.button}
//           type="button"
//           value="Log State"
//         />
//       </div>
//     );
//   }
// }

export default MediaEditor;
