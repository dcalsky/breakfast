import React from 'react'
import _ from 'lodash'
import cx from 'classnames'
import './style.css'

export default React.createClass({
  render() {
    return (
      <ul className="food-list">
        {this.props.foods.map((food, i) => {
          const name = food.get('name'), desc = food.get('desc'), price = food.get('price'), id = food.id;
          const _food = _.find(this.props.cart.foods, {id: id})
          const count = _food ? _food.count : 0
          return (
            <li key={i}>
              <p>{name}</p>
              <p>{desc}</p>
              <p>{price}</p>
              <button onClick={this.props.addFood.bind(this, {id, price})}>+</button>
              <br />
              {count}
              <br />
              {
                count > 0 ?
                  <button onClick={this.props.removeFood.bind(this, {id, price})}>-</button>
                  :
                  null
              }

            </li>)
        })}
      </ul>
    )
  }
})

