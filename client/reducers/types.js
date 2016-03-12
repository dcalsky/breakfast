import { handleActions } from 'redux-actions'

// Template of food

//const initialState = [{
//  id: 1,
//  name: ''
//}]

const initialState = {content: [{
  attributes: {
    name: '热销',
    no: 13
  }
}, {
  attributes: {
    name: '全部',
    no: 14
  }
}], active: 13}

export default handleActions({
  'sync types' (state, action) {
    return {
      content: initialState.content.concat(action.payload),
      active: 13
    }
  }
}, initialState)