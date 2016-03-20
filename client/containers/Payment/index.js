
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as OrderActions from '../../actions/order'
import './style.styl'

const payURL = "http://tjbf.leanapp.cn/pay"
//todo
const partner_id = "2088221435928705"

class Payment extends Component {
  //          .send({out_trade_no: result.id, subject: '食物订单', seller_id: '2088221435928705', total_fee: total, body: '普通食物订单', show_url: '1'})

  render() {
    if(this.props.order && Object.keys(this.props.order).length === 2) {
      return (
        <form className="payment" action={payURL} method="post" target="_self">
          <input type="hidden" name="out_trade_no" value={this.props.order.id} />
          <input type="hidden" name="subject" value="同济外卖食物"/>
          <input type="hidden" name="seller_id" value={partner_id} />
          <input type="hidden" name="total_fee" value={this.props.order.total} />
          <input type="hidden" name="body" value="普通食物订单" />
          <input type="hidden" name="show_url" value="1" />
          <h3>共计: {this.props.order.total} 元</h3>
          <button type="submit">确认付款</button>
        </form>
      )
    } else {
      return <h1 style={{textAlign: 'center'}}>未创建任何订单</h1>
    }

  }
}

function mapStateToProps(state) {
  return {
    order: state.get('order')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleOrder: bindActionCreators(OrderActions, dispatch),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment)
