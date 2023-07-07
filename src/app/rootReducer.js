import { combineReducers } from '@reduxjs/toolkit'
import priceStore from './price.store'
import globalStore from './global.store'

const rootReducer = combineReducers({
  global: globalStore,
  price: priceStore
})

export default rootReducer
