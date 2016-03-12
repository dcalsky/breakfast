import React, { Component } from 'react'
import Header from '../../components/Header'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class App extends Component {
  render() {
    return (
      <app>
        <Header path={this.props.location.pathname}/>
        {this.props.children}
      </app>
    )
  }
}


export default connect()(App)
