import React, { Component } from 'react'
import { MenuList } from 'bloomer'
import FilterItem from '../filterItem/filterItem.component'

export default class FilterList extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    if (this.props.filterList && this.props.filterList.values.length > 0) {
      return (
        <MenuList>
          {this.props.filterList.values.map((filter, idx) => {
            return <FilterItem
              key={idx}
              onFilterChange={this.props.onFilterChange}
              filter={Object.assign({field: this.props.filterList.field},filter)}
            ></FilterItem>
          })}
        </MenuList>
      )
    } else {
      return null
    }
  }

}
