
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FoodActions from '../../actions/foods'
import * as TypeActions from '../../actions/types'
import { getTypes } from '../../Api/food'
import style from './style.css'



class Home extends Component {
  constructor(props) {
    super(props)
    this.getTypes()
  }
  getTypes() {
    getTypes().then(result => {
      this.props.handleType.syncTypes(result)
    })
  }
  render() {
    return (
      <div>
        {this.props.types.map((type, i) => {
          return (
            <li key={i}>{type.attributes.name}</li>
          )
        })}
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
)(Home)
