import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../../actions/user'
import { getOrderDetail } from '../../Api/order'
import { getCurrentUser, getUserInfo } from '../../Api/user'
import './style.styl'

class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: [],
      detail: [],
      currentId: null
    }
    this.init()
  }
  init() {
    const currentUser = getCurrentUser()
    if( !currentUser ) {
      hashHistory.push('/login')
      return 0
    }
    getUserInfo(currentUser)
      .then(orders => {
        this.setState({
          orders: orders
        })
      })
  }
  handleGetDetail(id) {
    getOrderDetail(id).then(detail => {
      console.log(detail)
      this.setState({
        detail: detail,
        currentId: id
      })
    })
  }
  render() {
    return (
      <div className="user">
        <ul className="user-order-list">
          {this.state.orders.map((order, i) => {
            return (
              <li key={`user-order-${i}`} className="user-order-item" onClick={this.handleGetDetail.bind(this, order.id)}>
                <div className="order-base">
                  <p className="base-title">{order.get('name')} {order.get('floor')} {order.get('room')}的订单</p>
                  <p className="base-time">时间: {moment(order.get('startDate')).format('YYYY/MM/DD HH:mm')}</p>
                </div>
                <div className="order-status">
                  <p className="status-price">￥{order.get('total')}</p>
                  {
                    order.get('paid') ?
                      <p className="status-paid">已付款</p>
                      :
                      <p className="status-unpaid">未付款</p>
                  }
                </div>
                {
                  this.state.detail.length !== 0 && order.id === this.state.currentId ?
                    <ul className="detail-amount">
                      {this.state.detail.map((detail, i) => {
                        return (
                          <li className="detail-item" key={`detail-${i}`}>
                            <span>{detail.get('name')}</span>
                            <span style={{float: 'right'}}>{detail.get('count')} 份</span>
                          </li>
                        )
                      })}
                    </ul>
                    :
                    null
                }
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user').toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleUser: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)

/*
 * <div className="home-type">
 <TypeList types={types.content} active={types.active} handleSelectType={::this.handleSelectType} />
 </div>
 * */