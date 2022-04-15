import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import randomHash from 'utils/random-hash';

const TitleSlice = createSlice({
  initialState: { postHash: randomHash(), title: '' },
  name: 'title',
  reducers: {
    changeTitle(_, action: PayloadAction<string>) {
      return {
        ..._,
        title: action.payload,
      };
    },
    generateNewHash() {
      return { postHash: randomHash(), title: '' };
    },
  },
});

export default TitleSlice.reducer;
export const { changeTitle } = TitleSlice.actions;
