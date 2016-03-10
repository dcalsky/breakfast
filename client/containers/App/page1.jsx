
import React, { Component } from 'react'

class Header extends Component {
  handleSave(text) {
    if (text.length) {
      this.props.addTodo(text)
    }
  }
  render() {
    return (
      <header>
        <h1>dsadsdasdas</h1>
      </header>
    )
  }
}

export default Header
