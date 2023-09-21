// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { id, name, avatar } = action.payload;
      state.id = id;
      state.name = name;
      state.avatar = avatar;
    },
    clearUser: (state) => {
      state.id = null;
      state.name = '';
      state.avatar = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;