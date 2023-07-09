import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: null,
  location: ''
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    setCheckLocation: (state, action) => {
      state.location = action.payload
    }
  }
})

export const { setUserInfo, setCheckLocation } = globalSlice.actions

export default globalSlice.reducer
