import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

export interface RoomsState {
  rooms: string[];
}

const initialState: RoomsState = {
  rooms: [],
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRoomsTo: (state, action: PayloadAction<string[]>) => {
      state.rooms = action.payload;
    },
    addNewRoom: (state, action: PayloadAction<string>) => {
      state.rooms.push(action.payload);
    },
  },
});

export const { setRoomsTo, addNewRoom } = roomsSlice.actions;

export const selectRooms = (state: RootState) => state.rooms;

export default roomsSlice.reducer;
