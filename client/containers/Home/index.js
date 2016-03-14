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
    const cart = this.props.cart
    if(cart.total > 0 && cart.count > 0) {
      hashHistory.push('/order')
    }
  }
  skipToLogin() {
    const user = this.props.user
    console.log(user)
    if(Object.keys(user).length !== 0 && !user.hadLogin) {
      hashHistory.push('/login')
    }
  }
  render() {
    const {types, foods, cart} = this.props
    return (
      <div className="home">
        Home
        <button onClick={::this.skipToOrder}>Go Order</button>
        <button onClick={::this.skipToLogin}>Go Login</button>
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
    types: state.get('types'),
    cart: state.get('cart').toJS(),
    user: state.get('user').toJS()
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
