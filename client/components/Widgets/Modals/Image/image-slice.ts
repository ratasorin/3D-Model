import { createModalSlice } from 'store/widgets/widgets-creators';

const imageSlice = createModalSlice<
  'image-viewer',
  {
    src: string;
  }
>('image-viewer', { src: '' });

export const { name } = imageSlice;
export const { open, close } = imageSlice.actions;
export default imageSlice.reducer;
