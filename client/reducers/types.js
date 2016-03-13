import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

// Template of food

//const initialState = [{
//  id: 1,
//  name: ''
//}]

const initialState = Immutable.fromJS({content: [{
  id: 'hot',
  attributes: {
    name: '热销',
  }
}], active: 'hot'})

export default handleActions({
  'sync types' (state, action) {
    return state.merge({
      active: 'hot'
    })
  },
  'select type' (state, action) {
    return state.merge({
      content: state.get('content'),
      active: action.payload
    })
  }
}, initialState)