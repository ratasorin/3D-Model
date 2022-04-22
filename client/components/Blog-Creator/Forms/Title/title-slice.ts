import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import randomHash from 'utils/random-hash';

const TitleSlice = createSlice({
  initialState: { postHash: randomHash(), title: '' },
  name: 'title',
  reducers: {
    changeTitle(state, action: PayloadAction<string>) {
      return {
        ...state,
        title: action.payload,
      };
    },
    generateNewHash() {
      return { postHash: randomHash(), title: '' };
    },
  },
});

export default TitleSlice.reducer;
export const { changeTitle, generateNewHash } = TitleSlice.actions;
