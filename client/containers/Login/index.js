import React, { Component } from 'react'
import Immutable from 'immutable'
import { login, register, loginWithPhone, getKey } from '../../Api/user'
import { getCurrentUser } from '../../Api/user'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../../actions/user'
import style from './style.styl'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      key: null
    }
    if(getCurrentUser()) {
      hashHistory.push('/')
    }
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
        event = login(this.state.username, this.state.password)
        break
    }
    event.then(result => {
      let info = _.mapKeys(result.attributes, function(value, key) {
          return key
      })
      info.token = result._sessionToken
      this.props.handleUser.login(info)
      hashHistory.push('/order')
    })
  }
  handleGetKey() {
    //getKey(this.state.username)
  }
  switchMode() {
    if(this.props.params.type === 'phone') {
      hashHistory.push('/login')
    } else {
      hashHistory.push('/login/phone')
    }
  }
  handleFormSubmit(e) {
    e.preventDefault()
  }
  render() {
    const { user } = this.props
    const type = this.props.params.type
    return (
      <div className="login">
        {
          type === 'phone' ?
              <form className="login-form" onSubmit={::this.handleFormSubmit}>
                <div className="form-table">
                  <input type="text" value={this.state.username} onChange={this.handleInputChange.bind(this, 'username')} placeholder="手机号码"/>
                  <button className="get-key" onClick={::this.handleGetKey}>获取验证码</button>
                </div>
                <div className="form-table">
                  <input type="text" value={this.state.key} onChange={this.handleInputChange.bind(this, 'key')} placeholder="收到的验证码"/>
                </div>
                <p className="switch-login-mode" onClick={::this.switchMode}>账号密码登陆</p>
                <button className="login-phone-button" onClick={::this.handleLogin.bind(this, 'loginWithPhone')}>验证并登陆</button>
              </form>
            :
            <form className="login-form" onSubmit={::this.handleFormSubmit}>
              <div className="form-table">
                <input type="text" value={this.state.username} onChange={this.handleInputChange.bind(this, 'username')} placeholder="用户名"/>
              </div>
              <div className="form-table">
                <input type="password" value={this.state.password} onChange={this.handleInputChange.bind(this, 'password')} placeholder="密码"/>
              </div>
              <p className="switch-login-mode" onClick={::this.switchMode}>短信验证码登陆</p>
              <button className="login-button" onClick={::this.handleLogin.bind(this, 'login')}>登陆</button>
              <button className="register-button" onClick={::this.handleLogin.bind(this, 'register')}>注册</button>
            </form>
        }
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
