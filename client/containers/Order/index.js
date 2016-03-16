
import React, { Component } from 'react'
import moment from 'moment'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createOrder } from '../../Api/order'
import { getCurrentUser } from '../../Api/user'
import CartList from '../../components/CartList'
import DatePicker from 'react-datepicker'
import style from './style.css'
import './react-datepicker.css'

const finalTime = 22

class Order extends Component {
  constructor(props) {
    super(props)
    if(!getCurrentUser()) hashHistory.push('/login')
    if(Object.keys(this.props.cart.foods).length === 0) hashHistory.push('/')
    this.minStartDay = moment().hour() < finalTime ? 1 : 2
    this.state = {
      startDate: moment().add(this.minStartDay, 'days'),
      endDate: moment().add(this.minStartDay + 1, 'days')
    }
  }
  handleBack() {
    hashHistory.push('/')
  }
  handleCreateOrder() {
    const { cart } = this.props
    createOrder(cart.total, cart.foods, this.state.startDate, this.state.endDate)
  }
  handleDateChange({ startDate, endDate }) {
  startDate = startDate || this.state.startDate
  endDate = endDate || this.state.endDate
  if (startDate.isAfter(endDate)) {
    let temp = startDate
    startDate = endDate
    endDate = temp
  }
  this.setState({ startDate, endDate })
}

  handleChangeStart(startDate) {
    this.handleDateChange({ startDate })
  }

  handleChangeEnd(endDate) {
    this.handleDateChange({ endDate })
  }
  handleChangeInput() {

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
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          minDate={moment().add(this.minStartDay, 'days')}
          onChange={::this.handleChangeStart} />
        结束时间:
        <DatePicker
          selected={this.state.endDate}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          minDate={moment().add(this.minStartDay + 1, 'days')}
          onChange={::this.handleChangeEnd} />

        地址:
        <input type="text" />

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
