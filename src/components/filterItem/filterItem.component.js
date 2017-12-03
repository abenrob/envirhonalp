import React, { Component } from 'react'
import { render } from 'react-dom'

export default class FilterItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: null,
      checked: null,
      field: null 
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      field: newProps.filter.field,
      name: newProps.filter.name, 
      checked: newProps.filter.checked
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.name && !prevState.checked && !prevState.field) {
      this.props.onFilterChange(this.state)
    }    
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
