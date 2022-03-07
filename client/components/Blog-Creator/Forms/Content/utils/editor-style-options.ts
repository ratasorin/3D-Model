import { EditorState, getVisibleSelectionRect } from 'draft-js';
import { Dispatch, SetStateAction } from 'react';
import { closePopup, openPopup } from 'store/widgets/actions/popup-actions';

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

const showStyleForText = (
  newEditorState: EditorState,
  setEditorState: Dispatch<SetStateAction<EditorState>>
) => {
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

export default showStyleForText;
