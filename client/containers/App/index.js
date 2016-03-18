import React, { Component } from 'react'
import Header from '../../components/Header'
import * as UserActions from '../../actions/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class App extends Component {
  render() {
    return (
      <app>
        <Header path={this.props.location.pathname} logout={this.props.handleUser.logout}/>
        {this.props.children}
      </app>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleUser: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
