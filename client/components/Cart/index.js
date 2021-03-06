import React from 'react'
import './style.styl'

export default React.createClass({
  render() {
    return (
      <div className="cart">
        <div className="cart-count">
          <i className="fa fa-shopping-cart"></i>
          <em>{this.props.cart.count}</em>
        </div>
        <div className="cart-total">
          共计: {this.props.cart.total} 元
        </div>
        <div className="cart-buy">
          <button onClick={this.props.handleSkip} disabled={this.props.disabled}>{this.props.buttonTitle}</button>
        </div>
      </div>
    )
  }
})

