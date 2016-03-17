
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FoodActions from '../../actions/foods'
import * as TypeActions from '../../actions/types'
import * as CartActions from '../../actions/cart'
import * as UserActions from '../../actions/user'
import { getTypes, getFoods } from '../../Api/food'

class Foods extends Component {
  render() {
    return (
      <div className="foods">
        {this.props.params.foodId}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    foods: state.get('foods'),
    cart: state.get('cart').toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleFood: bindActionCreators(FoodActions, dispatch),
    handleType: bindActionCreators(TypeActions, dispatch),
    handleCart: bindActionCreators(CartActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Foods)
