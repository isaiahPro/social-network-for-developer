import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice_folder/counterSlice'
import displayReducer from "./counterSlice_folder/displayNavSlice"

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
  reducer: {
    display: displayReducer,
  },
})