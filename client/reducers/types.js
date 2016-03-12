import { handleActions } from 'redux-actions'

// Template of food

//const initialState = [{
//  id: 1,
//  name: ''
//}]

const initialState = {content: [{
  id: 'hot',
  attributes: {
    name: '热销',
  }
}], active: 'hot'}

export default handleActions({
  'sync types' (state, action) {
    return {
      content: initialState.content.concat(action.payload),
      active: 'hot'
    }
  },
  'select type' (state, action) {
    return {
      content: state.content,
      active: action.payload
    }
  }
}, initialState)