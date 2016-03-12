import React from 'react'
import cx from 'classnames'
import './style.css'

export default React.createClass({
  render() {
    return (
      <div className="cart">
        count: {this.props.cart.count}
        total: {this.props.cart.total}
      </div>
    )
  }
})

