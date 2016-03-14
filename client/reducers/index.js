
import { combineReducers } from 'redux-immutable'
import routing from './routing'
import cart from './cart'
import foods from './foods'
import common from './common'
import types from './types'
import user from './user'

export default combineReducers({
  routing,
  cart,
  common,
  foods,
  types,
  user
})
