import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createModalSlice } from 'store/widgets/widgets-creators';

const simplePopup = createSlice({
  name: 'simple-popup',
  initialState: {
    visible: false,
    x: 0,
    y: 0,
    jsonContent: JSON.stringify(''),
  },
  reducers: {
    open(
      _,
      action: PayloadAction<{ x: number; y: number; jsonContent: string }>
    ) {
      return {
        visible: true,
        x: action.payload.x,
        y: action.payload.y,
        jsonContent: action.payload.jsonContent,
      };
    },
    close() {
      return {
        visible: false,
        x: 0,
        y: 0,
        jsonContent: JSON.stringify(''),
      };
    },
  },
});

export default simplePopup.reducer;
export const { open, close } = simplePopup.actions;
export const name = simplePopup.name;
