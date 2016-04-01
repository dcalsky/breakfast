import Immutable from 'immutable'
import { handleActions } from 'redux-actions'

const initialState = Immutable.fromJS({
  couponId: null,
  coupons: []
})


export default handleActions({
  'had coupon' (state, action) {
    return state.merge({
      couponId: action.payload
    })
  },
  'fetch coupon' (state, action) {
    return state.merge({
      coupons: action.payload
    })
  }
}, initialState)