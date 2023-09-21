import { configureStore } from '@reduxjs/toolkit'
import displayReducer from "./counterSlice_folder/displayNavSlice"
import userReducer  from './counterSlice_folder/userDataSlice'

export default configureStore({
  reducer: {
    display: displayReducer,
    user: userReducer,
  }
})