import { handleActions } from 'redux-actions'

// Template of food

//const initialState = [{
//  id: 1,
//  name: ''
//}]

const initialState = []

export default handleActions({
  'sync types' (state, action) {
    return action.payload
  }
}, initialState)