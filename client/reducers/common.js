import { handleActions } from 'redux-actions'


const initialState = {
  title: '主页',
  route: 'home'
}


export default handleActions({
  'modify title' (state, action) {
    return {
      title: action.payload.title,
      route: action.payload.route
    }
  }
}, initialState)