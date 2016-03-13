import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import _ from 'lodash'

// Template of carts
const initialState = Immutable.fromJS({
  foods: [],
  count: 0,
  total: 0
})

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
    const i = _.findIndex(state.get('foods').toJS(), {id: action.payload.id})
    const total = toDecimal(state.get('total') + action.payload.price)
    if( i === -1 ) {
      return state.merge({
        count:  state.get('count') + 1,
        total: total,
        foods: state.get('foods').push(Immutable.fromJS({id: action.payload.id, count: 1}))
      })
    } else {
      let preFoods = state.get('foods').toJS()
      preFoods[i].count++
      return state.merge({
        count: state.get('count') + 1,
        foods: Immutable.fromJS(preFoods),
        total: total
      })
    }
  },
  'remove food' (state, action) {
    const i = _.findIndex(state.get('foods').toJS(), {id: action.payload.id})
    const total = toDecimal(state.get('total') - action.payload.price)
    let preFoods = state.get('foods').toJS()
    if( i !== -1 && preFoods[i].count > 0) {
      return state.merge({
        count: state.get('count') - 1,
        total: total,
        foods: Immutable.fromJS(preFoods.map(food => {
          if(food.id === action.payload.id){
            food.count --
          }
          return food
        }).filter(food => food.count !== 0))
      })
    } else {
      return state
    }
  }
}, initialState)