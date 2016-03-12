
import React, { Component } from 'react'
import cx from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FoodActions from '../../actions/foods'
import * as TypeActions from '../../actions/types'
import * as CartActions from '../../actions/cart'
import { modifyTitle } from '../../actions/common'
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
    this.props.modifyTitle({title: '主页', route: 'home'})
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
  render() {
    const {types, foods, cart} = this.props
    return (
      <div className="home">
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
    foods: state.foods,
    types: state.types,
    cart: state.cart
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleFood: bindActionCreators(FoodActions, dispatch),
    handleType: bindActionCreators(TypeActions, dispatch),
    modifyTitle: bindActionCreators(modifyTitle, dispatch),
    handleCart: bindActionCreators(CartActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
