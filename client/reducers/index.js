
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import cart from './cart'
import foods from './foods'
import common from './common'
import types from './types'

export default combineReducers({
  routing,
  cart,
  common,
  foods,
  types
})
