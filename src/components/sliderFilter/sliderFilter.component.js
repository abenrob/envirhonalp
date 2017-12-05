import React, { Component } from 'react'
import {
  PanelBlock, Menu, MenuLabel
} from 'bloomer'

import { Range } from 'rc-slider'

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
    const range = [1900,(new Date()).getFullYear()]
    let actuals = []
    if (value[0] === 0) {
      actuals[0] = '<= 1900'
    } else {
      actuals[0] = Math.round((value[0]/100) * (range[1] - range[0])) + range[0]
    }

    if (value[1] === 100) {
      actuals[1] = 'ajd.'
    } else {
      actuals[1] = Math.round((value[1]/100) * (range[1] - range[0])) + range[0]
    }
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
