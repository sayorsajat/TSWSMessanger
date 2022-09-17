import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

export interface RoomsState {
  rooms: object[];
}

const initialState: RoomsState = {
  rooms: [],
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoomsTo: (state, action: PayloadAction<object[]>) => {
      state.rooms = action.payload;
    },
    addNewRoom: (state, action: PayloadAction<object>) => {
      state.rooms.push(action.payload);
    },
  },
});

export const { setRoomsTo, addNewRoom } = roomsSlice.actions;

export const selectRooms = (state: RootState) => state.rooms.rooms;

export default roomsSlice.reducer;
