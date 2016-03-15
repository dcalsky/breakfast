import React, { Component } from 'react'
import Immutable from 'immutable'
import { login, register, loginWithPhone, getKey } from '../../Api/user'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../../actions/user'
import style from './style.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      key: null
    }
  }
  handleBack() {
    hashHistory.goBack()
  }
  handleInputChange(type, e) {
    switch (type) {
      case 'username':
        this.setState({
          username: e.target.value,
          password: this.state.password
        })
        break
      case 'password':
        this.setState({
          username: this.state.username,
          password: e.target.value
        })
        break
      case 'key':
        this.setState({
          key: e.target.value
        })
        break
    }
  }
  handleLogin(type) {
    let event
    switch (type) {
      case 'register':
        event = register(this.state.username, this.state.password)
        break
      case 'loginWithPhone':
        event = loginWithPhone(this.state.username, this.state.key)
        break
      default:
        event = login('1453937', '260013')
        break
    }
    event.then(result => {
      let info = _.mapKeys(result.attributes, function(value, key) {
          return key
      })
      info.token = result._sessionToken
      console.log(info)
      this.props.handleUser.login(info)
    })
  }
  handleGetKey() {
    getKey(this.state.username)
  }
  render() {
    const { user } = this.props
    const type = this.props.params.type
    return (
      <div>
        Login
        <button onClick={::this.handleBack}>Go back</button>
        {
          type === 'phone' ?
            <div className="login-phone">
              phone
              <input type="text" value={this.state.username} onChange={this.handleInputChange.bind(this, 'username')} />
              <input type="text" value={this.state.key} onChange={this.handleInputChange.bind(this, 'key')} />
              <button onClick={::this.handleGetKey}>Get Key</button>
              <button onClick={::this.handleLogin.bind(this, 'loginWithPhone')}>Login</button>
            </div>
            :
            <div className="login-normal">
              <input type="text" value={this.state.username} onChange={this.handleInputChange.bind(this, 'username')} />
              <input type="text" value={this.state.password} onChange={this.handleInputChange.bind(this, 'password')} />
              <button onClick={::this.handleLogin.bind(this, 'login')}>Login</button>
              <button onClick={::this.handleLogin.bind(this, 'register')}>Register</button>
            </div>
        }
        <li>username: {user.username}</li>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user').toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleUser: bindActionCreators(UserActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
