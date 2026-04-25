import { createSlice } from '@reduxjs/toolkit';
import inventoryDataService from '../services/inventoryDataService';
import { Group } from '../types/group';

interface GroupsState {
  items: Group[];
}

const initialState: GroupsState = {
  items: inventoryDataService.getGroups(),
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
});

export default groupsSlice.reducer;
