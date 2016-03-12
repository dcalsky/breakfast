import React from 'react'
import cx from 'classnames'
import './style.css'

export default React.createClass({
  render() {
    return (
      <ul className="food-list">
        {this.props.foods.map((type, i) => {
          return (
            <li key={i}>
              name: {type.get('name')}
            </li>)
        })}
      </ul>
    )
  }
})

