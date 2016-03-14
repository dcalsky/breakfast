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
    this.state = {
      username: '',
      password: ''
    }
  }
  handleBack() {
    hashHistory.goBack()
  }
  handleInputChange(type, e) {
    switch (type) {
      case 'username':
        this.setState({
          username: e.target.value,
          password: this.state.password
        })
        break
      case 'password':
        this.setState({
          username: this.state.username,
          password: e.target.value
        })
        break
    }
  }
  handleLogin() {

  }
  handleGetKey() {

  }
  render() {
    const { user } = this.props
    const type = this.props.params.type
    return (
      <div>
        Login
        <button onClick={::this.handleBack}>Go back</button>
        <button onClick={::this.handleGetKey}>Get Key</button>
        {
          type === 'phone' ?
            <div className="login-phone">
              phone
              <input type="text" value={this.state.username} onChange={this.handleInputChange.bind(this, 'username')} />
            </div>
            :
            <div className="login-normal">
              <input type="text" value={this.state.username} onChange={this.handleInputChange.bind(this, 'username')} />
              <input type="text" value={this.state.password} onChange={this.handleInputChange.bind(this, 'password')} />
              <button >Login</button>
              <button >Register</button>
            </div>
        }

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
