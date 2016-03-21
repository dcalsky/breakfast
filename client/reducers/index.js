
import { combineReducers } from 'redux-immutable'
import routing from './routing'
import cart from './cart'
import foods from './foods'
import common from './common'
import types from './types'
import user from './user'
import order from './order'
import coupon from './coupon'

export default combineReducers({
  routing,
  cart,
  common,
  foods,
  types,
  user,
  order,
  coupon
})
