
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import { createOrder } from '../../Api/order'
import CartList from '../../components/CartList'
import style from './style.css'
import './react-select.css'

const options = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' }
];

class Order extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: options[0].value
    }
  }
  handleBack() {
    hashHistory.goBack()
  }
  handleCreateOrder() {
    const { cart } = this.props
    createOrder(cart.total, cart.foods)
  }
  handleChangeDate(val) {
    this.setState({
      date: val
    })
  }
  render() {
    const { cart } = this.props
    return (
      <div>
        order
        <button onClick={::this.handleBack}>Go back</button>
        <CartList cart={cart} />
        起送时间:
        <button onClick={::this.handleCreateOrder}>Create Order</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.get('cart').toJS()
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
