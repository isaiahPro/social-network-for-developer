import { createSlice } from '@reduxjs/toolkit'

export const changedisplaySlice= createSlice({
  name: 'display',
  initialState: {
    value: false,
  },
  reducers: {
    changedisplay: (state) => {
      state.value = !state.value
    }
  },
})

// Action creators are generated for each case reducer function
export const { changedisplay } = changedisplaySlice.actions

export default changedisplaySlice.reducer;