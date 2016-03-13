
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import Immutable  from 'immutable'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import Todo from './containers/Todo'
import Home from './containers/Home'
import Order from './containers/Order'
import Payment from './containers/Payment'
import configure from './store'

const store = configure(Immutable.fromJS({}))
//const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} >
        <Route path="/order" component={Order} />
        <Route path="/payment" component={Payment} />
        <IndexRoute component={Home} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
