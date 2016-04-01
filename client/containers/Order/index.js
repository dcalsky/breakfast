import React, { Component } from 'react'
import moment from 'moment'
import _ from 'lodash'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hadCoupon, addCoupon, fetchCoupon } from '../../Api/coupon'
import { createOrder } from '../../Api/order'
import { isPhoneNumber, isLegalName, isLegalPassword } from '../../actions/common'
import { getFloors } from '../../Api/floor'
import { getTimeSlot } from '../../Api/time'
import { getCurrentUser } from '../../Api/user'
import * as CouponActions from '../../actions/coupon'
import * as OrderActions from '../../actions/order'
import DatePicker from 'react-datepicker'
import alipayImage from '../../images/alipay.png'
import './style.styl'
import './react-datepicker.css'

const finalTime = 23 // We send final orders to vendor before 22:00

class Order extends Component {
  constructor(props) {
    super(props)
    const { user, cart } = this.props
    const currentUser = getCurrentUser()
    this.minStartDay = moment().hour() < finalTime ? 0 : 1  // If this moment late than 22:00, order is pull off to tomorrow
    this.state = {
      startDate: moment().add(this.minStartDay, 'days'),
      days: 1,
      room: user.room,
      floor: user.floor || '西南一',
      mobilePhoneNumber: user.mobilePhoneNumber,
      name: user.name,
      floors: [],
      timeSlot: [],
      buttonDisabled: false,
      couponId: null,
      couponDiscount: 0,
      fare: 0.5
    }
    if(!currentUser) {
      hashHistory.push('/login')
      return
    } // if not login, back to login page
    if(Object.keys(cart.foods).length === 0) {
      hashHistory.push('/')
      return
    } // if none food in cart, back to index page
    getFloors().then(result => {
      const floors = result.map(floor => {
        return floor.get('name')
      })
      this.setState({
        floors: floors
      })
    })
    getTimeSlot().then(result => {
      let timeSlot = []
      let date = moment().add(this.minStartDay, 'days')
      result.map(time => {
        let moment1 = moment(), moment2 = moment()
        moment1.set('hour', parseInt(time.get('hours')))
        moment1.set('minute', parseInt(time.get('minutes')))
        moment1.subtract(30, 'minutes') // 提早30分钟提交订单给制作
        if(moment1 - moment2 > 0 || this.minStartDay === 1) { // 早于时间档 或者 过了finalTime 就加入
          timeSlot.push(time)
        }
      })
      date.set('hour', parseInt(timeSlot[0].get('hours')))
      date.set('minute', parseInt(timeSlot[0].get('minutes')))
      date.set('second', 0)
      this.setState({
        timeSlot: timeSlot,
        startDate: date
      })
    })
    hadCoupon(this.props.coupon.couponId, currentUser, result => {
      if(!result) { // result is true or false
        addCoupon(this.props.coupon.couponId, currentUser).then(() => {
          fetchCoupon(currentUser, coupons => {
            this.props.handleCoupon.fetchCoupon(coupons)
          })
        })
      } else {
        fetchCoupon(currentUser, coupons => {
          this.props.handleCoupon.fetchCoupon(coupons)
        })
      }
    })
  }
  handleCreateOrder(e) {
    e.preventDefault()
    const { cart } = this.props
    if(!isPhoneNumber(this.state.mobilePhoneNumber)) {
      alert('手机号码格式有误')
    } else if(!isLegalName(this.state.name)) {
      alert('姓名格式有误')
    } else if(!this.state.room || this.state.room.length === 0) {
      alert('请填写房间号')
    } else {
      this.setState({
        buttonDisabled: true
      })
      const total = _.round(this.state.days * cart.total + this.state.fare, 1)
      createOrder(total, cart.foods, this.state.startDate,  this.state.floor, this.state.room, this.state.name, this.state.mobilePhoneNumber, this.state.couponId, this.state.couponDiscount, result => {
        this.props.handleOrder.createOrder({id: result.id, total: result.total})
        if(result.total === 0 ) {
          hashHistory.push({pathname: '/result', query: {result: true}})
        } else {
          hashHistory.push('/payment')
        }
      })
    }

  }
  handleDateChange(startDate) {
    let date = this.state.startDate
    startDate.set('hour', date.hour())
    startDate.set('minute', date.minute())
    this.setState({
      startDate : startDate
    })
  }
  handleTimeChange(e) {
    let date = this.state.startDate
    const time_array = e.target.value.split(':')
    date.set('hour', time_array[0])
    date.set('minute', time_array[1])
    date.set('second', 0)
    this.setState({
      startDate: date
    })
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
  handleSelectCoupon(e) {
    const coupon = _.find(this.props.coupon.coupons, {id: this.state.couponId})
    const discount = coupon ? coupon.get('discount') : 0
    this.setState({
      couponId: e.target.value,
      couponDiscount: discount
    })
  }
  skipPayment() {
    hashHistory.push('/payment')
  }
  render() {
    const { cart, coupon } = this.props
    return (
      <form className="order"  onSubmit={::this.handleCreateOrder}>
        <ul className="order-address">
          <li className="order-address-item">
            <span>寝室楼</span>
            <select value={this.state.floor} onChange={this.handleChangeInput.bind(this, 'floor')}>
              {
                this.state.floors.map((floor, i) => {
                  return (
                    <option key={`floor-${i}`} value={floor}>{floor}</option>
                  )
                })
              }
            </select>
          </li>
          <li className="room">
            <span>房间号</span>
            <input type="text" placeholder="房间号" onChange={this.handleChangeInput.bind(this, 'room')}/>
          </li>
        </ul>

        <ul className="order-user">
          <li className="order-user-item">
            <span>真实姓名</span>
            <input type="text" placeholder="姓名" value={this.state.name} onChange={this.handleChangeInput.bind(this, 'name')}/>
          </li>
          <li className="room">
            <span>联系方式</span>
            <input type="text" placeholder="手机号码" value={this.state.mobilePhoneNumber} onChange={this.handleChangeInput.bind(this, 'mobilePhoneNumber')}/>
          </li>
        </ul>

        <ul className="order-date">
          <li className="order-date-item">
            <span>日期</span>
            <DatePicker
              className="order-start-date"
              dateFormat="YYYY/MM/DD"
              selected={this.state.startDate}
              minDate={moment().add(this.minStartDay, 'days')}
              onChange={::this.handleDateChange}
              popoverAttachment='top center'
              popoverTargetAttachment='bottom center'
              popoverTargetOffset='0px -80px' />
          </li>
          <li className="order-date-item">
            <span>时间</span>
            <select onChange={::this.handleTimeChange}>
              {
                this.state.timeSlot.map((time, i) => {
                  return <option key={`timeSlot-${i}`} value={`${time.get('hours')}:${time.get('minutes')}`}>{`${time.get('hours')}:${time.get('minutes')}`}</option>
                })
              }
            </select>
          </li>
        </ul>

        <ul className="order-pay">
          <li className="order-coupon-item">
            <span>优惠券</span>
            <select value={this.state.couponId} onChange={::this.handleSelectCoupon}>
              <option value={null}>没有选择优惠券</option>
              {
                coupon.coupons.map((coupon, i) => {
                  return (
                    <option key={`coupon-${i}`} value={coupon.id}>{`${coupon.get('name')}/${coupon.get('discount')}元`}</option>
                  )
                })
              }
            </select>
          </li>
          <li className="order-pay-item">
            <span>支付方式</span>
            <img src={alipayImage} alt="alipay icon"/>
          </li>
        </ul>

        <ul className="order-amount">
          {cart.foods.map((food, i) => {
            return (
              <li className="order-cart-item" key={`cart-${i}`}>
                <span>{food.name}</span>
                <span style={{float: 'right'}}>{food.count} 份</span>
              </li>
            )
          })}
          <li className="order-amount-days">
          <span>送餐天数</span>
          <span style={{float: 'right'}}>{this.state.days} 天</span>
        </li>
          <li className="order-amount-fare">
            <span>运费</span>
            <span style={{float: 'right'}}>{this.state.fare}元</span>
          </li>
          {
            this.state.couponDiscount != 0 ?
              <li className="order-amount-discount">
                <span>优惠</span>
                <span style={{float: 'right'}}>{this.state.couponDiscount}</span>
              </li>
              :
              null
          }
          <li className="order-amount-days">
            <span>共计</span>
            <span style={{float: 'right'}}>{_.round(this.state.days * cart.total - this.state.couponDiscount  + this.state.fare, 1)}元</span>
          </li>
        </ul>
        <div className="pay">
          <button type="submit" disabled={this.state.buttonDisabled}>确认下单</button>
        </div>
      </form>
    )
  }
}


function mapStateToProps(state) {
  return {
    cart: state.get('cart').toJS(),
    user: state.get('user').toJS(),
    order: state.get('order'),
    coupon: state.get('coupon')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleOrder: bindActionCreators(OrderActions, dispatch),
    handleCoupon: bindActionCreators(CouponActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order)


/*<li className="order-date-item">
 <span>结束时间</span>
 <DatePicker
 className="order-end-date"
 selected={this.state.endDate}
 startDate={this.state.startDate}
 endDate={this.state.endDate}
 minDate={moment().add(this.minStartDay, 'days')}
 onChange={::this.handleChangeEnd}
 popoverAttachment='top center'
 popoverTargetAttachment='bottom center'
 popoverTargetOffset='0px -80px'/>
 </li>*/