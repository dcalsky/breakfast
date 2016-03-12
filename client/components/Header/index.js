import React from 'react'

export default React.createClass({
  render() {
    return (
      <header>
        {this.props.title}
      </header>
    )
  }
})