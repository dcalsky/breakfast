import React from 'react'

export default React.createClass({
  render() {
    return (
      <ul className="cart-list">
        {this.props.cart.foods.map((food, i) => {
          console.log(food)
          return (
            <li className="cart-food" key={i}>
              {food.id}
              <br />
              {food.count}
            </li>
          )
        })}
      </ul>
    )
  }
})