import React, { Component } from 'react'
import Immutable from 'immutable'
import { hashHistory } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../../actions/user'
import style from './style.css'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = Immutable.fromJS({
      username: '',
      password: ''
    })
  }
  handleBack() {
    hashHistory.goBack()
  }
  handleInputChange(type, e) {
    const prevState = this.state

    console.log(prevState.get('username'))
    this.setState(prevState.set(type, e.target.value))
  }

  render() {
    const { user } = this.props
    return (
      <div>
        Login
        <button onClick={::this.handleBack}>Go back</button>
        <input type="text" value={this.state.get('username')} onChange={this.handleInputChange.bind(this, 'username')} />
        <input type="text" value={this.state.get('password')} onChange={this.handleInputChange.bind(this, 'password')} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.get('user').toJS()
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleUser: bindActionCreators(UserActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
