import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  username: null,
  token: null,
  name: null,
  floor: null,
  room: null,
  phone: null,
  orders: [],
  hadLogin: false
})


export default handleActions({
  'login' (state, action) {
    return state.merge(action.payload, {hadLogin: true})
  },
  'logout' (state, action) {
    return initialState
  },
  'update info' (state, action) {
    return state.merge(action.payload)
  },
  'get orders' (state, action) {
    return state.set('orders', action.payload)
  },
  'update password' (state, action) {
    return initialState
  }
}, initialState)