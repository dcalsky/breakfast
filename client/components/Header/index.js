import React from 'react'
import './style.styl'

export default React.createClass({
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
      default :
        title = '设置'
        break
    }
    return (
      <header className="header">
        {
          this.props.path !== '/' ?
            <div className="back-button">
              Back
            </div>
            :
            null
        }
        <h3>{title}</h3>
      </header>
    )
  }
})