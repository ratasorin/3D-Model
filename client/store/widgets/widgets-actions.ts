import { useAppSelector } from 'hooks/redux-hooks';

import { open as modifyOpen } from 'components/Widgets/Modals/Modify/modify-modal-slice';
import { open as infoOpen } from 'components/Widgets/Modals/Info/info-modal-slice';
import { open as pictureOpen } from 'components/Widgets/Modals/Pictures/picture-modal-slice';
import { open as authenticateOpen } from 'components/Widgets/Modals/Authenticate/authenticate-slice';
import { open as blogsOpen } from 'components/Widgets/Modals/Blogs/blogs-slice';
import { open as SimplePopupOpen } from 'components/Widgets/Popup/Tools/tools-slice';
import { open as SuccessPopupOpen } from 'components/Widgets/Popup/Success/success-slice';
import { open as blogOpen } from 'components/Widgets/Modals/Blogs/Blog/blog-slice';

import { supportedModals, supportedPopup } from './widgets-available';

const modalsOpenActions = [
  modifyOpen,
  infoOpen,
  pictureOpen,
  authenticateOpen,
  blogsOpen,
  blogOpen,
] as const;

const popupOpenActions = [SimplePopupOpen, SuccessPopupOpen];

export interface PopupBuilder {
  type: 'Error' | 'Success';
  payload: string | JSX.Element;
}

export type supportedModalActions = Parameters<
  typeof modalsOpenActions[number]
>[0];

export type supportedPopupActions = Parameters<
  typeof popupOpenActions[number]
>[0];

export const indexOf = (widget: supportedModals | supportedPopup) => {
  const Index = useAppSelector(({ stackReducer }) => {
    let index = stackReducer.indexOf(widget);
    if (index >= 0) index += 100;
    return index;
  });
  return Index;
};
