import React from 'react'
import cx from 'classnames'
import './style.styl'

export default React.createClass({
  render() {
    return (
      <ul className="type-list">
        {this.props.types.map((type, i) => {
          return (
          <li
            key={i}
            className={cx({'type-active': type.id === this.props.active, "type-list-item": true})}
            onClick={()=>{this.props.handleSelectType(type.id)}}>
            {type.attributes.name}
          </li>)
        })}
      </ul>
    )
  }
})

