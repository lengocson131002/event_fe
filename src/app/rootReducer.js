import { combineReducers } from '@reduxjs/toolkit'
import globalStore from './global.store'

const rootReducer = combineReducers({
  global: globalStore
})

export default rootReducer
