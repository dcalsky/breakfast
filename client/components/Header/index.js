import React from 'react'

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
      <header>
        {title}
      </header>
    )
  }
})