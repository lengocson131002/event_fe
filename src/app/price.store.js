import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  price: null,
  subscriptionId: null
}

export const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    setPrice: (state, action) => {
      state.price = action.payload
    },
    setDescriptionId: (state, action) => {
      state.subscriptionId = action.payload
    }
  }
})

export const { setPrice, setDescriptionId } = priceSlice.actions

export default priceSlice.reducer
