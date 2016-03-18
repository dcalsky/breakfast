import React from 'react'
import { hashHistory } from 'react-router'
import './style.styl'

export default React.createClass({
  handleBack() {
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
      default :
        title = '设置'
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
      </header>
    )
  }
})