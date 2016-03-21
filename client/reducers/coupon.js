import { handleActions } from 'redux-actions'

const initialState = {
  couponId: null,
  coupons: []
}


export default handleActions({
  'get coupon' (state, action) {
    return {
      couponId: action.payload,
      coupons: state.coupons
    }
  }
}, initialState)