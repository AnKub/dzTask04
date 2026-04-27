import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from '../types/group';

interface GroupsState {
  items: Group[];
}

const initialState: GroupsState = {
  items: [],
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Group[]>) {
      state.items = action.payload;
    },
  },
});

export const { setItems } = groupsSlice.actions;
export default groupsSlice.reducer;
