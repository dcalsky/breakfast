import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import cx from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FoodActions from '../../actions/foods'
import * as TypeActions from '../../actions/types'
import * as CartActions from '../../actions/cart'
import * as UserActions from '../../actions/user'
import { getTypes, getFoods } from '../../Api/food'
import { getCurrentUser } from '../../Api/user'
import TypeList from '../../components/TypeList'
import FoodList from '../../components/FoodList'
import Cart from '../../components/Cart'
import './home.styl'

class Home extends Component {
  constructor(props) {
    super(props)
    this.init()
  }
  init() {
    const currentUser = getCurrentUser()
    if(!this.props.foods.loaded) {
      getFoods().then(result => {
        this.props.handleFood.syncFoods(result)
        finish()
      })
    }
    if(!this.props.types.loaded) {
      getTypes().then(result => {
        this.props.handleType.syncTypes(result)
      })
    }
    if(currentUser && !this.props.user.hadLogin) {
      let info = _.mapKeys(currentUser.attributes, function(value, key) {
        return key
      })
      info.token = currentUser._sessionToken
      this.props.handleUser.login(info)
    }
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
    if(Object.keys(user).length !== 0 && !user.hadLogin) {
      hashHistory.push('/login')
    }
  }
  render() {
    const {types, foods, cart} = this.props
    return (
      <div className="home">
        <div className="home-type">
          <TypeList types={types.content} active={types.active} handleSelectType={::this.handleSelectType} />
        </div>
        <div className="home-food">
          <FoodList foods={foods.content} addFood={this.props.handleCart.addFood}  removeFood={this.props.handleCart.removeFood} cart={cart} />
        </div>
        <Cart cart={cart} handleSkip={::this.skipToOrder} buttonTitle="选好了"/>
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
    handleUser: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
