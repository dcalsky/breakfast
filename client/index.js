
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'
import Immutable  from 'immutable'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import Home from './containers/Home'
import Foods from './containers/Foods'
import Order from './containers/Order'
import Login from './containers/Login'
import Result from './containers/Result'
import Payment from './containers/Payment'
import User from './containers/User'
// import LoginWithPhone from './containers/Login/'
import configure from './store'

const store = configure(Immutable.fromJS({}))
//const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App} >
        <Route path="/order" component={Order} />
        <Route path="/payment" component={Payment} />
        <Route path="/result" component={Result} />
        <Route path="/user" component={User} />
        <Route path="/login" component={Login}>
          <Route path="/login/:type" />
        </Route>
        <Route path="/foods" component={Foods}>
          <Route path="/foods/:foodId" />
        </Route>
        <IndexRoute component={Home} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)