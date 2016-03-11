
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FoodActions from '../../actions/foods'
import * as TypeActions from '../../actions/types'
import style from './style.css'

class App extends Component {
  render() {
    const { types, handleType, children } = this.props
    console.log(this.props)
    return (
      <div>
        Home
        <button onClick={e=>{handleType.getTypes()}}>123</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    foods: state.foods,
    types: state.types
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleFood: bindActionCreators(FoodActions, dispatch),
    handleType: bindActionCreators(TypeActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
