import React, { Component } from 'react'
import { render } from 'react-dom'

export default class FilterItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: "",
      checked: null 
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({name: newProps.filter.name, checked: newProps.filter.checked})
  }

  componentDidUpdate() {
    // console.log(this.state,this.props.filter)
  }

  toggle() {
    this.setState({checked: !this.state.checked})
  }

  render() {
      return <li 
        className="filter-item" 
        onClick={() => this.toggle()}>
          <i className={`fa ${this.state.checked ? "fa-dot-circle-o" : "fa-circle-o"}`} aria-hidden="true"></i> 
          {this.state.name} 
      </li>
  }
}
