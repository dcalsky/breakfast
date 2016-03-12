
import React, { Component } from 'react'
import cx from 'classnames'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as FoodActions from '../../actions/foods'
import * as TypeActions from '../../actions/types'
import { modifyTitle } from '../../actions/common'
import { getTypes, getFoods } from '../../Api/food'
import './home.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.init()
  }
  init() {
    this.props.modifyTitle({title: '主页', route: 'home'})
    getTypes().then(result => {
      this.props.handleType.syncTypes(result)
    })
    getFoods().then(result => {
      this.props.handleFood.syncFoods(result)
    })
  }
  render() {
    const {types, foods} = this.props
    return (
      <div className="type-list">
        {this.props.types.content.map((type, i) => {
          return (
            <li key={i} className={cx({'active': type.attributes.no === this.props.types.active})}>{type.attributes.name}</li>
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
    handleType: bindActionCreators(TypeActions, dispatch),
    modifyTitle: bindActionCreators(modifyTitle, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
