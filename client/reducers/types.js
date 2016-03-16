import { handleActions } from 'redux-actions'
import Immutable from 'immutable'

// Template of food
const initialState = {
  active: 'hot',
  content: [{
    id: 'hot',
    loaded: false,
    attributes: {
      name: '热销'
    }
  }]
}

export default handleActions({
  'sync types' (state, action) {
    return {
      active: 'hot',
      content: initialState.content.concat(action.payload),
      loaded: true
    }
  },
  'select type' (state, action) {
    return {
      content: state.content,
      active: action.payload
    }
  }
}, initialState)