
import { handleActions } from 'redux-actions'

const initialState = {
  couponId: null,
  coupons: []
}


export default handleActions({
  'had coupon' (state, action) {
    return {
      couponId: action.payload
    }
  },
  'fetch coupon' (state, action) {
    return {
      coupons: action.payload
    }
  }
}, initialState)