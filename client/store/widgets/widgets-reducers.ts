import modifyModalReducer, {
  name as modifyModalReducerName,
} from 'components/Widgets/Modals/Modify/modify-modal-slice';
import infoModalReducer, {
  name as infoModalReducerName,
} from 'components/Widgets/Modals/Info/info-modal-slice';
import pictureModalReducer, {
  name as pictureModalReducerName,
} from 'components/Widgets/Modals/Pictures/picture-modal-slice';
import authenticateReducer, {
  name as authenticateReducerName,
} from 'components/Widgets/Modals/Authenticate/authenticate-slice';
import stackReducer from 'components/Widgets/stack-slice';
import popupReducer from 'components/Widgets/Popup/Success/success-slice';
import blogsModalReducer, {
  name as blogsModalReducerName,
} from 'components/Widgets/Modals/Blogs/blogs-slice';
import simplePopupReducer from 'components/Widgets/Popup/Tools/tools-slice';
import blogModalReducer, {
  name as blogModalReducerName,
} from 'components/Widgets/Modals/Blogs/Blog/blog-slice';
import imageReducer, {
  name as imageName,
} from 'components/Widgets/Modals/Image/image-slice';

import pdfReducer, {
  name as pdfName,
} from 'components/Widgets/Modals/PDF/pdf-slice';

export const widgets = {
  [modifyModalReducerName]: modifyModalReducer,
  [infoModalReducerName]: infoModalReducer,
  [pictureModalReducerName]: pictureModalReducer,
  [authenticateReducerName]: authenticateReducer,
  [blogsModalReducerName]: blogsModalReducer,
  [blogModalReducerName]: blogModalReducer,
  [imageName]: imageReducer,
  [pdfName]: pdfReducer,
  popupReducer,
  simplePopupReducer,
  stackReducer,
} as const;
