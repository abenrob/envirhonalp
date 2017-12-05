import React, { Component } from 'react'

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

  toggle() {
    this.props.onFilterChange(Object.assign(this.state, {checked: !this.state.checked}))
  }

  render() {
      return <li 
        className="filter-item" 
        onClick={() => this.toggle()}>
          <i className={`fa ${this.state.checked ? "fa-check-square" : "fa-square"}`} aria-hidden="true"></i> 
          {this.state.name} 
      </li>
  }
}
