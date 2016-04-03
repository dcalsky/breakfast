import React from 'react'
import { hashHistory } from 'react-router'
import { getIngredient } from '../../Api/food'
import ImageLoader from 'react-imageloader'
import Immutable from 'immutable'
import _ from 'lodash'
import './style.styl'

const preloader = () => {
  return <img src="http://7xrq8g.com1.z0.glb.clouddn.com/default_image_small.png" alt="Food image" />
}


// 2016/3/25 remove onClick={this.skipFoodDetail.bind(this, id)} enter detail of food page
export default React.createClass({
  getInitialState() {
    return {
      isExpandIngredient: false,
      expandNo: null,
      ingredients: []
    }
  },
  skipFoodDetail(id) {
    hashHistory.push(`/foods/${id}`)
  },
  handleExpandIngredient(id) {
    const isExpandIngredient = id !== this.state.expandNo || !this.state.isExpandIngredient;
    this.setState({
      isExpandIngredient: isExpandIngredient,
      expandNo: id,
      ingredients: id === this.state.expandNo ? this.state.ingredients : []
    })
    if(isExpandIngredient) {
      if(!this.state[id]) {
        getIngredient(id).then(ingredients => {
          const state = Immutable.fromJS(this.state).set(id, ingredients).set("ingredients", ingredients)
          this.setState(state.toJS())
        })
      } else {
          this.setState({
            ingredients: this.state[id]
          })
      }

    }
  },
  render() {
    return (
      <ul className="food-list">
        {this.props.foods.map((food, i) => {
          const id = food.id, name = food.get('name'), desc = food.get('desc'), price = food.get('price'), sold = food.get('sold'), img = food.get('image')
          const _food = _.find(this.props.cart.foods, {id: id})
          const count = _food ? _food.count : 0
          const isExpand = this.state.isExpandIngredient && this.state.expandNo === id
          return (
            <li key={i} className="food-list-item">
              <div className="food-image">
                <ImageLoader
                  src={img}
                  preloader={preloader}>
                  Image load failed!
                </ImageLoader>
              </div>
              <div className="food-info">
                <div className="food-info-name">
                  {name}
                </div>

                <div className="food-info-sold">
                  售出: {sold}份
                </div>

                <div className="food-info-price">
                  <i className="fa fa-jpy"></i>
                  <span>{price}</span>
                </div>
                <div className="food-info-ingredient">
                  <button onClick={this.handleExpandIngredient.bind(this, id)}>
                    加料
                    {
                      isExpand ?
                        <i className="fa fa-chevron-up"></i>
                        :
                        <i className="fa fa-chevron-down"></i>
                    }
                  </button>
                </div>
              </div>
              <div className="food-info-button">
                {
                  count > 0 ?
                    <button className="minus" onClick={this.props.removeFood.bind(this, {id, price, name})}><i className="fa fa-minus"></i></button>
                    :
                    null
                }
                {
                  count > 0 ?
                    <span className="food-info-count">{count}</span>
                    :
                    null
                }
                <button className="plus" onClick={this.props.addFood.bind(this, {id, price, name})}><i className="fa fa-plus"></i></button>
              </div>
              {
                isExpand ?
                  <ul className="ingredient-list">
                    {this.state.ingredients.map((ingredient, i) => {
                      return (
                        <li className="ingredient-iten" key={`ingredient-${i}`}>
                          {ingredient.get('name')}
                        </li>
                      )
                    })}
                  </ul>
                  :
                  null

              }
            </li>)
        })}
      </ul>
    )
  }
})

