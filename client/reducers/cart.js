import { handleActions } from 'redux-actions'
import Immutable from 'immutable'
import _ from 'lodash'

// Template of carts
const initialState = Immutable.fromJS({
  foods: [],
  count: 0,
  total: 0
})


export default handleActions({
  'add food' (state, action) {
    const i = _.findIndex(state.get('foods').toJS(), {id: action.payload.id})
    const total = _.round((state.get('total') + action.payload.price), 1)
    if( i === -1 ) {
      return state.merge({
        count:  state.get('count') + 1,
        total: total,
        foods: state.get('foods').push(Immutable.fromJS({id: action.payload.id, count: 1, name: action.payload.name}))
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
    const total = _.round((state.get('total') - action.payload.price), 1)
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
  },
  'clear food' (state, action) {
    return initialState
  }
}, initialState)