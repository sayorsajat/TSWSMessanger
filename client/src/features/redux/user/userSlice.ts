import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

export interface UserState {
  isLogin: boolean;
  user: object;
  // rooms: string[];
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

export const selectUser = (state: RootState) => state.user.user;
export const selectIsLogin = (state: RootState) => state.user.isLogin;

export default userSlice.reducer;
