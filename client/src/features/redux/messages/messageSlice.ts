import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

type messageObject = {
  id: number
  roomId: string;
  userName: string;
  content: string;
  image: string | null;
}

export interface messageState {
  messages: messageObject[]
}

const initialState: messageState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<messageObject[]>) => {
      state.messages = action.payload;
    },
    addNewMessage: (state, action: PayloadAction<messageObject>) => {
      state.messages.push(action.payload);
    }
  },
});

export const { setMessages, addNewMessage } = messageSlice.actions;

export const selectMessages = (state: RootState) => state.user

export default messageSlice.reducer;
