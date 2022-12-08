import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/redux/user/userSlice';
import messageReducer from '../features/redux/messages/messageSlice';
import roomsReducer from '../features/redux/rooms/roomsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    rooms: roomsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
