
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { modifyTitle } from '../../actions/common'
import CartList from '../../components/CartList'
import style from './style.css'

class Order extends Component {
  handleBack() {
    hashHistory.goBack()
  }

  render() {
    const { cart } = this.props
    return (
      <div>
        order
        <button onClick={::this.handleBack}>Go back</button>
        <CartList cart={cart} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order)
