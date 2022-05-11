import { name as modifyModalName } from 'components/Widgets/Modals/Modify/modify-modal-slice';
import { name as infoName } from 'components/Widgets/Modals/Info/info-modal-slice';
import { name as pictureName } from 'components/Widgets/Modals/Pictures/picture-modal-slice';
import { name as authenticateName } from 'components/Widgets/Modals/Authenticate/authenticate-slice';
import { name as popupName } from 'components/Widgets/Popup/Success/success-slice';
import { name as blogsName } from 'components/Widgets/Modals/Blogs/blogs-slice';
import { name as simplePopupName } from 'components/Widgets/Popup/Tools/tools-slice';
import { name as blogName } from 'components/Widgets/Modals/Blogs/Blog/blog-slice';
import { name as imageName } from 'components/Widgets/Modals/Image/image-slice';
import { name as pdfName } from 'components/Widgets/Modals/PDF/pdf-slice';

const modals = [
  modifyModalName,
  infoName,
  pictureName,
  authenticateName,
  blogsName,
  blogName,
  imageName,
  pdfName,
] as const;

const popups = [popupName, simplePopupName] as const;

export type supportedModals = typeof modals[number];
export type supportedPopup = typeof popups[number];
