import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../types/user';

type UsersState = {
  items: User[];
  loading: boolean;
  error: string | null;
};

const initialState: UsersState = {
  items: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    addUser(state, action: PayloadAction<User>) {
      state.items.push(action.payload);
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.items.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setUsers, addUser, updateUser, setLoading, setError } = usersSlice.actions;
export default usersSlice.reducer;