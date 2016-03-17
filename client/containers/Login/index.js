import React, { Component } from 'react'
import Immutable from 'immutable'
import { login, register, loginWithPhone, getKey } from '../../Api/user'
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
      this.props.handleUser.login(info)
      hashHistory.push('/order')
    })
  }
  handleGetKey() {
    getKey(this.state.username)
  }
  switchMode() {
    if(this.props.params.type === 'phone') {
      hashHistory.push('/login')
    } else {
      hashHistory.push('/login/phone')
    }
  }
  render() {
    const { user } = this.props
    const type = this.props.params.type
    return (
      <div className="login">
        <button onClick={::this.switchMode}>切换登陆模式</button>
        {
          type === 'phone' ?
            <div className="login-phone">
              手机号码:
              <input type="text" value={this.state.username} onChange={this.handleInputChange.bind(this, 'username')} />
              验证码:
              <input type="text" value={this.state.key} onChange={this.handleInputChange.bind(this, 'key')} />
              <button onClick={::this.handleGetKey}>获取短信验证码</button>
              <button onClick={::this.handleLogin.bind(this, 'loginWithPhone')}>登陆</button>
            </div>
            :
            <div className="login-normal">
              用户名:
              <input type="text" value={this.state.username} onChange={this.handleInputChange.bind(this, 'username')} />
              密码:
              <input type="text" value={this.state.password} onChange={this.handleInputChange.bind(this, 'password')} />
              <button onClick={::this.handleLogin.bind(this, 'login')}>登陆</button>
              <button onClick={::this.handleLogin.bind(this, 'register')}>注册</button>
            </div>
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
