import React, { Component } from 'react'
import { render } from 'react-dom'
import {
  Panel, PanelHeading, PanelBlock, PanelIcon, Button, Checkbox, Menu, MenuLabel
} from 'bloomer'
import FilterList from '../filterList/filterList.component'

export default class FilterMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    
  }

  componentDidUpdate() {
    //console.log(this.props.filters)
  }

  render() {

    if (this.props.filters) {
      return (
        <div
          className="search-container"
        >
        <Panel>
            <PanelHeading>Filtres</PanelHeading>
            {
              Object.keys(this.props.filters).map((filter, index) => {
                const thisFilter = this.props.filters[filter]
                return <PanelBlock key={index}  ><Menu>
                      <MenuLabel>{thisFilter.name}</MenuLabel>
                      <FilterList
                        filterList={thisFilter}
                      ></FilterList>
                    </Menu></PanelBlock>
              })
            }
            <PanelBlock>
                <Button isOutlined isFullWidth isColor='primary'> Réinitialiser les filtres</Button>
            </PanelBlock>
        </Panel>
        </div>
      )
    } else {
      return null
    }
    
  }

}
