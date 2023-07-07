import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: null
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    }
  }
})

export const { setUserInfo } = globalSlice.actions

export default globalSlice.reducer
