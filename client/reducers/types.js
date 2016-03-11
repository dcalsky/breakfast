import { handleActions } from 'redux-actions'
import { getTypes }  from '../Api/food'

// Template of food

//const initialState = [{
//  id: 1,
//  name: ''
//}]

const initialState = []

export default handleActions({
  'get types' (state, action) {
    getTypes().then(result => {
      console.log(result)
    })
  }
}, initialState)