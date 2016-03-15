
import React, { Component } from 'react'
import moment from 'moment'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createOrder } from '../../Api/order'
import CartList from '../../components/CartList'
import DatePicker from 'react-datepicker'
import style from './style.css'
import './react-datepicker.css'

const finalTime = 22

class Order extends Component {
  constructor(props) {
    super(props)
    this.minStartDay = moment().hour() < finalTime ? 1 : 2
    this.state = {
      startDate: null
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
      startDate: val
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
        <DatePicker
          selected={this.state.startDate}
          onChange={::this.handleChangeDate}
          minDate={moment().add(this.minStartDay, 'days')}
          maxDate={moment().add(29, 'days')}
          placeholderText="Select a date between today and 5 days in the future" />

        03/16/2016

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
