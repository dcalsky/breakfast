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
        foods: state.get('foods').push(Immutable.fromJS({id: action.payload.id, count: 1, name: action.payload.name, ingredients: []}))
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
  'add ingredient' (state, action) {
    const i = _.findIndex(state.get('foods').toJS(), {id: action.payload.foodId})
    const total = _.round((state.get('total') + action.payload.ingredient.price), 1)
    if( i === -1 ) {
      return state
    } else {
      let preFoods = state.get('foods').toJS()
      preFoods[i].ingredients.push({
        id: action.payload.ingredient.id,
        name: action.payload.ingredient.name,
        price: action.payload.ingredient.price
      })
      return state.merge({
        count: state.get('count'),
        foods: Immutable.fromJS(preFoods),
        total: total
      })
    }
  },
  'remove ingredient' (state, action) {
    const i = _.findIndex(state.get('foods').toJS(), {id: action.payload.foodId})
    const total = _.round((state.get('total') - action.payload.ingredient.price), 1)
    if( i === -1 ) {
      return state.merge({
        total: total
      })
    } else {
      let preFoods = state.get('foods').toJS()
      preFoods[i].ingredients = preFoods[i].ingredients.filter(ingredient => ingredient.id !== action.payload.ingredient.id)
      console.log(preFoods[i].ingredients)
      return state.merge({
        count: state.get('count'),
        foods: Immutable.fromJS(preFoods),
        total: total
      })
    }
  },
  'remove food' (state, action) {
    const i = _.findIndex(state.get('foods').toJS(), {id: action.payload.id})
    const total = _.round((state.get('total') - action.payload.price), 1)
    let preFoods = state.get('foods').toJS()
    if( preFoods[i].ingredients.length !== 0 && preFoods[i].count <= 1) {
      alert('取消食物前请先勾除配料 !')
      return state
    }
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