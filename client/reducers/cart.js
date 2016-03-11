import { handleActions } from 'redux-actions'

// Template of foods

//const initialState = [{
//  id: 1,
//  name: '',
//  price: 0
//}]

const initialState = []

export default handleActions({
  'add food' (state, action) {
    return [{
      id: action.id,
      name: action.name,
      price: action.price
    }, ...state]
  },
  'remove food' (state, action) {
    return state.filter(food => food.id !== action.payload )
  }
}, initialState)

