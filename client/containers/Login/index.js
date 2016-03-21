import React, { Component } from 'react'
import Immutable from 'immutable'
import { login, register, loginWithPhone, getKey } from '../../Api/user'
import { getCurrentUser } from '../../Api/user'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { isLegalPassword, isPhoneNumber } from '../../actions/common'
import * as UserActions from '../../actions/user'
import * as CouponActions from '../../actions/coupon'
import style from './style.styl'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      ableToGetKey: false,
      waitingTime: 0,
      key: null
    }
    if(getCurrentUser()) {
      hashHistory.push('/')
    }
  }
  handleInputChange(type, e) {
    const value = e.target.value
    switch (type) {
      case 'username':
        this.setState({
          username: value,
          password: this.state.password
        })
        break
      case 'phone':
        this.setState({
          username: value,
          ableToGetKey: isPhoneNumber(value)
        })
        break
      case 'password':
        this.setState({
          username: this.state.username,
          password: value
        })
        break
      case 'key':
        this.setState({
          key: value
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
        event = loginWithPhone(this.state.username, this.state.key, this.props.location.query.coupon)
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
      this.props.handleCoupon.getCoupon(this.props.location.query.coupon)
      hashHistory.push('/order')
    })
  }
  handleGetKey() {
    if(this.state.ableToGetKey && this.state.waitingTime === 0) {
      getKey(this.state.username)
      this.setState({
        ableToGetKey: false,
        waitingTime: 60
      })
    }
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
        <div className="login-form">
          <div className="form-table">
            <input type="text" value={this.state.username} onChange={this.handleInputChange.bind(this, 'phone')} placeholder="手机号码"/>
            <button className="get-key" disabled={!this.state.ableToGetKey || !(this.state.waitingTime === 0)} onClick={::this.handleGetKey}>获取验证码</button>
          </div>
          <div className="form-table">
            <input type="text" value={this.state.key} onChange={this.handleInputChange.bind(this, 'key')} placeholder="收到的验证码"/>
          </div>
          <button className="login-phone-button" onClick={::this.handleLogin.bind(this, 'loginWithPhone')}>验证并登陆</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user').toJS(),
    coupon: state.coupon
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleUser: bindActionCreators(UserActions, dispatch),
    handleCoupon: bindActionCreators(CouponActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)


/*            :
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
 }*/