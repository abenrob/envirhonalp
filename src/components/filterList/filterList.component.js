import React, { Component } from 'react'
import { render } from 'react-dom'
import {
  Checkbox, MenuList, Control
} from 'bloomer'
import FilterItem from '../filterItem/filterItem.component'

export default class FilterList extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    
  }

  componentDidUpdate() {
    // console.log('thing',this.props.filterList)
  }

  render() {

    if (this.props.filterList && this.props.filterList.values.length > 0) {
      return (
        <MenuList>
          {this.props.filterList.values.map((filter, idx) => {
            return <FilterItem
              key={idx}
              filter={filter}
            ></FilterItem>
          })}
        </MenuList>
      )
    } else {
      return null
    }
  }

}
