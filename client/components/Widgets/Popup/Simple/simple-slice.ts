import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createModalSlice } from 'store/widgets/widgets-creators';

const simplePopup = createSlice({
  name: 'simple-popup',
  initialState: {
    visible: false,
    x: 0,
    y: 0,
  },
  reducers: {
    open(_, action: PayloadAction<{ x: number; y: number }>) {
      return {
        visible: true,
        x: action.payload.x,
        y: action.payload.y,
      };
    },
    close() {
      return {
        visible: false,
        x: 0,
        y: 0,
      };
    },
  },
});

export default simplePopup.reducer;
export const { open, close } = simplePopup.actions;
export const name = simplePopup.name;
