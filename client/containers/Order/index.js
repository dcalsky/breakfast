import React, { Component } from 'react'
import moment from 'moment'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { createOrder } from '../../Api/order'
import { getFloors } from '../../Api/floor'
import { getCurrentUser } from '../../Api/user'
import CartList from '../../components/CartList'
import DatePicker from 'react-datepicker'
import style from './style.css'
import './react-datepicker.css'

const finalTime = 22 // We send final orders to vendor before 22:00

class Order extends Component {
  constructor(props) {
    super(props)
    const { user, cart } = this.props
    if(!getCurrentUser()) hashHistory.push('/login') // if not login, back to login page
    if(Object.keys(cart.foods).length === 0) hashHistory.push('/') // if none food in cart, back to index page
    this.minStartDay = moment().hour() < finalTime ? 1 : 2  // If this moment late than 22:00, order is pull off to tomorrow
    this.state = {
      startDate: moment().add(this.minStartDay, 'days'),
      endDate: moment().add(this.minStartDay + 1, 'days'),
      room: user.room,
      floor: user.floor,
      mobilePhoneNumber: user.mobilePhoneNumber,
      name: user.name,
      floors: []
    }
    getFloors().then(result => {
      const floors = result.map(floor => {
        return floor.get('name')
      })
      this.setState({
        floors: floors
      })
    })
  }
  handleBack() {
    hashHistory.push('/')
  }
  handleCreateOrder() {
    const { cart } = this.props
    createOrder(cart.total, cart.foods, this.state.startDate, this.state.endDate,  this.state.floor, this.state.room, this.state.name, this.state.mobilePhoneNumber)
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
  handleChangeInput(type, e) {
    const value = e.target.value
    switch (type) {
      case 'name':
        this.setState({name: value})
        break
      case 'mobilePhoneNumber':
        this.setState({mobilePhoneNumber: value})
        break
      case 'floor':
        this.setState({floor: value})
        break
      case 'room':
        this.setState({room: value})
        break
    }
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
        姓名:
        <input type="text" placeholder="姓名" onChange={::this.handleChangeInput.bind(this, 'name')}/>
        地址:
        <select value={this.state.floor} onChange={::this.handleChangeInput.bind(this, 'floor')}>
          {
            this.state.floors.map(floor => {
              return (
                <option value={floor}>{floor}</option>
              )
            })
          }
        </select>
        <input type="text" placeholder="房间号" onChange={::this.handleChangeInput.bind(this, 'room')}/>
        联系方式:
        <input type="text" placeholder="手机号" onChange={::this.handleChangeInput.bind(this, 'mobilePhoneNumber')}/>
        <button onClick={::this.handleCreateOrder}>Create Order</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    cart: state.get('cart').toJS(),
    user: state.get('user').toJS()
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
