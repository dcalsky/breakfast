import { handleActions } from 'redux-actions'

const initialState = {}


export default handleActions({
  'create order' (state, action) {
    return action.payload
  }
}, initialState)