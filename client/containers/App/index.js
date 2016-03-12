import React, { Component } from 'react'
import Header from '../../components/Header'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class App extends Component {
  render() {
    console.log(this.props)
    return (
      <app>
        <Header title={this.props.title}/>
        {this.props.children}
      </app>
    )
  }
}

function mapStateToProps(state) {
  return {
    title: state.common.title
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
