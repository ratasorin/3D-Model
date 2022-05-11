import { createModalSlice } from 'store/widgets/widgets-creators';

const pdfSlice = createModalSlice<'pdf-viewer', { url: string; index: number }>(
  'pdf-viewer',
  {
    url: '',
    index: 0,
  }
);

export default pdfSlice.reducer;
export const name = pdfSlice.name;
export const { close, open } = pdfSlice.actions;
