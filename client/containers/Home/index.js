import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import cx from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FoodActions from '../../actions/foods'
import * as TypeActions from '../../actions/types'
import * as CartActions from '../../actions/cart'
import { getTypes, getFoods } from '../../Api/food'
import TypeList from '../../components/TypeList'
import FoodList from '../../components/FoodList'
import Cart from '../../components/Cart'
import './home.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.init()
  }
  init() {
    getTypes().then(result => {
      this.props.handleType.syncTypes(result)
    })
    getFoods().then(result => {
      this.props.handleFood.syncFoods(result)
    })
  }
  handleSelectType(type) {
    this.props.handleType.selectType(type)
  }
  skipToOrder() {
    hashHistory.push('/order')
  }
  render() {
    const {types, foods, cart} = this.props
    console.log(this.props)
    return (
      <div className="home">
        <button onClick={::this.skipToOrder}>Go Order</button>
        <div className="home-type">
          <TypeList types={types.content} active={types.active} handleSelectType={::this.handleSelectType} />
        </div>
        <div className="home-food">
          <FoodList foods={foods} addFood={this.props.handleCart.addFood}  removeFood={this.props.handleCart.removeFood} cart={cart} />
        </div>
        <div className="home-cart">
          <Cart cart={cart}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    foods: state.get('foods'),
    types: state.get('types').toJS(),
    cart: state.get('cart').toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleFood: bindActionCreators(FoodActions, dispatch),
    handleType: bindActionCreators(TypeActions, dispatch),
    handleCart: bindActionCreators(CartActions, dispatch),
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
