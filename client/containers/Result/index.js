import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import * as CartActions from '../../actions/cart'
import { connect } from 'react-redux'
import './style.styl'

class Result extends Component {
  //          .send({out_trade_no: result.id, subject: '食物订单', seller_id: '2088221435928705', total_fee: total, body: '普通食物订单', show_url: '1'})
  constructor(props) {
    super(props)
    const { query } = this.props.location
    if(query.result) {
      this.props.handleCart.clearFood()
    }
  }
  render() {
    const { query } = this.props.location
    return (
      <div className="result">
        {
          query.result ?
            <h3>支付成功</h3>
            :
            <h3>支付失败,请重试.</h3>
        }

      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    cart: state.get('cart')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleCart: bindActionCreators(CartActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Result)
