import { createModalSlice } from 'store/widgets/widgets-creators';

const pictureModalSlice = createModalSlice<'picture-modal', { name: string }>(
  'picture-modal',
  { name: '' }
);

export const { open, close } = pictureModalSlice.actions;
export const name = pictureModalSlice.name;
export default pictureModalSlice.reducer;
