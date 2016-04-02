import React from 'react'
import { hashHistory } from 'react-router'
import _ from 'lodash'
import './style.styl'


// 2016/3/25 remove onClick={this.skipFoodDetail.bind(this, id)} enter detail of food page
export default React.createClass({
  skipFoodDetail(id) {
    hashHistory.push(`/foods/${id}`)
  },
  render() {
    return (
      <ul className="food-list">
        {this.props.foods.map((food, i) => {
          const name = food.get('name'), desc = food.get('desc'), price = food.get('price'), id = food.id, sold = food.get('sold'), img = food.get('image')
          const _food = _.find(this.props.cart.foods, {id: id})
          const count = _food ? _food.count : 0
          return (
            <li key={i} className="food-list-item">
              <div className="food-image">
                <img src={img} alt=""/>
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
                  {price}
                </div>

              </div>
              <div className="food-info-button">
                {
                  count > 0 ?
                    <button onClick={this.props.removeFood.bind(this, {id, price, name})}><i className="fa fa-minus"></i></button>
                    :
                    null
                }
                {
                  count > 0 ?
                    <span className="food-info-count">{count}</span>
                    :
                    null
                }
                <button onClick={this.props.addFood.bind(this, {id, price, name})}><i className="fa fa-plus"></i></button>

              </div>
            </li>)
        })}
      </ul>
    )
  }
})

