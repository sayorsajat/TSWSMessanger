import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../app/store';
import { fetchCount } from '../../counter/counterAPI';

// type messageObject = {
//   id: number
//   roomId: string;
//   userName: string;
//   content: string;
//   image: string | null;
// }

export interface UserState {
  isLogin: boolean;
  user: object;
  // rooms: string[];
  // messages: messageObject[]
}

const initialState: UserState = {
  isLogin: false,
  user: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToLoggedIn: (state) => {
      state.isLogin = true;
    },
    setToNotLoggedIn: (state) => {
      state.isLogin = false;
    },
    setUserTo: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
  },
});

export const { setToLoggedIn, setToNotLoggedIn, setUserTo } = userSlice.actions;

// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
