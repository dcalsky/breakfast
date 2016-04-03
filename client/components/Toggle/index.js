import React from 'react'
import './style.css'

export default React.createClass({
  render() {
    return (
      <span>
          <input className='tgl tgl-ios' id={this.props.id} type='checkbox' checked={this.props.checked} onChange={this.props.onChange} />
          <label className='tgl-btn' htmlFor={this.props.id}></label>
      </span>

    )
  }
})