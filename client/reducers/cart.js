import { handleActions } from 'redux-actions'
import _ from 'lodash'

// Template of carts
const initialState = {
  foods: [],
  count: 0,
  total: 0
}

// correct to two decimal places
const toDecimal = x => {
  var f = parseFloat(x)
  if (isNaN(f)) {
    return
  }
  f = Math.round(x * 100) / 100
  return f
}

export default handleActions({
  'add food' (state, action) {
    let i = _.findIndex(state.foods, {id: action.payload.id})
    let _foods = state.foods
    if( i === -1 ) {
      _foods.push({
        id: action.payload.id,
        count: 1
      })
    } else {
      _foods[i].count++
    }
    return {
      count: state.count + 1,
      total: toDecimal(state.total + action.payload.price),
      foods: _foods
    }
  },
  'remove food' (state, action) {
    let i = _.findIndex(state.foods, {id: action.payload.id})
    if( i !== -1 && state.foods[i].count > 0) {
      return {
        count: state.count - 1,
        total: toDecimal(state.total - action.payload.price),
        foods: state.foods.map(food => {
          if(food.id === action.payload.id){
            food.count --
          }
          return food
        })
      }
    } else {
      return state
    }
  }
}, initialState)