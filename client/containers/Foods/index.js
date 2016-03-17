
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as FoodActions from '../../actions/foods'
import * as TypeActions from '../../actions/types'
import * as CartActions from '../../actions/cart'
import * as UserActions from '../../actions/user'
import { getTypes, getFoods } from '../../Api/food'

class Foods extends Component {
  constructor(props) {
    super(props)
    const foodId = this.props.params.foodId, foods = this.props.foods.content
    if(foodId && Object.keys(foods).length !== 0) {
      this.state = {
        food: _.find(this.props.foods.content, { id: this.props.params.foodId})
      }
    } else {
      hashHistory.push('/')
    }

  }
  render() {
    if(this.state) {
      const { food } = this.state
      const name = food.get('name'), desc = food.get('desc'), price = food.get('price'), id = food.id, sold = food.get('sold')
      const _food = _.find(this.props.cart.foods, {id: id})
      const count = _food ? _food.count : 0
      return (
        <div className="foods">
          <div className="food-info-img">
            <img src={food.get('image')} alt=""/>
          </div>
          <div className="food-info">
            <div className="food-info-name">{name}</div>
            <div className="food-info-sold">售出: {sold}份</div>
            <div className="food-info-price">￥{price}</div>
            <div className="food-info-button" style={{bottom: -10}}>
              {
                count > 0 ?
                  <button onClick={this.props.handleCart.removeFood.bind(this, {id, price})}><i className="fa fa-minus"></i></button>
                  :
                  null
              }
              {
                count > 0 ?
                  <span className="food-info-count">{count}</span>
                  :
                  null
              }
              <button onClick={this.props.handleCart.addFood.bind(this, {id, price})}><i className="fa fa-plus"></i></button>

            </div>
          </div>
        </div>
      )
    } else {
      return null
    }

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
