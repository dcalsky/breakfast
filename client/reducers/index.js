
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import todos from './todos'
import cart from './cart'
import foods from './foods'
import types from './types'

export default combineReducers({
  routing,
  todos,
  cart,
  foods,
  types
})
