import React, { Component } from 'react'
import {
  PanelBlock, Menu, MenuLabel
} from 'bloomer'

import { Range } from 'rc-slider'

import DateDomains from './../../utilities/dateDomains.utility'

export default class SliderFilter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: [0,100],
      low: '<= 1900',
      high: 'ajd.'
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.sliderRange && newProps.sliderRange !== this.state.value) {
      this.setState({value: newProps.sliderRange})
      this.dateDomainLookup(newProps.sliderRange)
    }
  }

  dateDomainLookup = (value) => {
    const actuals = DateDomains.displayDateLookup(value)
    this.setState({ low: actuals[0], high: actuals[1]})
  }

  sliderChange = (value) => {
    this.props.onSliderChange(value)
  }

  render() {
    return (
      <PanelBlock>
        <Menu className="slider-container">
          <MenuLabel>Temporelle</MenuLabel>
            <div className="slider-values">
              <div>{this.state.low}</div>
              <div>{this.state.high}</div>
            </div>
            <div className="slider-box">
              <Range allowCross={false} defaults={this.state.value} value={this.state.value} onChange={this.sliderChange} />
            </div>
        </Menu>
      </PanelBlock>
    )
  }

}
