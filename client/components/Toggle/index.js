import React from 'react'
import './style.css'

export default React.createClass({
  render() {
    return (
      <span>
          <input className='tgl tgl-ios' id='cb2' type='checkbox' onChange={this.props.onChange} />
          <label className='tgl-btn' htmlFor='cb2'></label>
      </span>

    )
  }
})