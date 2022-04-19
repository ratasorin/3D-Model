import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'next-auth';

export interface UserProvidedInput {
  lastUpdatedInfo: string;
  currentUserInfo: string;
  churchName: string;
  user: string;
}
const changeInfo = createSlice({
  name: 'change-info',
  initialState: {} as UserProvidedInput,
  reducers: {
    update(state, action: PayloadAction<string>) {
      return {
        ...state,
        lastUpdatedInfo: action.payload,
      };
    },
    processUserInput(
      state,
      action: PayloadAction<{
        info: string;
        churchName: string;
        user: string;
      }>
    ) {
      return {
        ...state,
        churchName: action.payload.churchName,
        currentUserInfo: action.payload.info,
        user: action.payload.user,
      };
    },
  },
});

export const { update, processUserInput } = changeInfo.actions;
export const name = changeInfo.name;
export default changeInfo.reducer;
