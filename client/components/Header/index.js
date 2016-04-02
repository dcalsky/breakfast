import React from 'react'
import { getCurrentUser, logout } from '../../Api/user'
import { hashHistory } from 'react-router'
import './style.styl'

export default React.createClass({
  getInitialState() {
    return {
      hadLogin: getCurrentUser() ? true : false
    }
  },
  handleBack() {
    hashHistory.push('/')
  },
  skipToLogin() {
    hashHistory.push('/login')
  },
  skipUserInfo() {
    hashHistory.push('/user')
  },
  handleLogout() {
    this.props.logout()
    this.setState({
      hadLogin: false
    })
    hashHistory.push('/')
  },
  render() {
    let title = '主页'
    switch (this.props.path) {
      case '/':
        title = '主页'
        break
      case '/order':
        title = '处理订单'
        break
      case '/payment':
        title = '付款'
        break
      case '/foods':
        title = '食物介绍'
        break
      case '/login':
        title = '登陆'
        break
      case '/login/phone':
        title = '手机验证登陆'
        break
      case '/result':
        title = '付款成功'
        break
      case '/user':
        title = '近期订单'
        break
      default :
        title = '其他'
        break
    }
    return (
      <header className="header">
        {
          this.props.path !== '/' ?
            <div className="back-button">
              <i className="fa fa-arrow-left" onClick={this.handleBack}></i>
            </div>
            :
            null
        }
        <h3>{title}</h3>
        {
          (this.state.hadLogin || getCurrentUser()) ?
            this.props.path === '/user' ?
              <div className="user-icon" onClick={this.handleLogout}>
                <i className="fa fa-sign-out"></i>
                注销
              </div>
              :
              <div className="user-icon" onClick={this.skipUserInfo}>
                <i className="fa fa-user"></i>
                我的
              </div>
            :
            this.props.path !== '/login' && this.props.path !== '/login/phone' ?
              <div className="user-icon" onClick={this.skipToLogin}>
                <i className="fa fa-sign-in"></i>
                登陆
              </div>
              :
              null

        }
      </header>
    )
  }
})