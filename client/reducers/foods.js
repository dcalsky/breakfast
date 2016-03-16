import { handleActions } from 'redux-actions'
import { getFoods }  from '../Api/food'

// Template of food

//const initialState = [{
//  id: 1,
//  name: '',
//  price: '',
//  img: '',
//  sold: 2,
//  onSale: false
//}]

const initialState = {
  loaded: false,
  content: []
}

export default handleActions({
  'sync foods' (state, action) {
    return {
      loaded: true,
      content: action.payload
    }
  }
}, initialState)