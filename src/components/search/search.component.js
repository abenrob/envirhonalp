import React, { Component } from 'react'
import { render } from 'react-dom'
import {
  Panel, PanelHeading, PanelBlock, PanelIcon, Button
} from 'bloomer'

const filters = [
  { title: "thèmes" },
  { title: "type de données"},
  { title: "couverture temporelle"}
]

export default class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    
  }

  componentDidUpdate() {

  }

  render() {

    return (
      <div
        className="search-container"
      >
      <Panel>
          <PanelHeading>Filtres</PanelHeading>
          {
            filters.map((filter, index) => {
              return <PanelBlock key={index}>
                  <PanelIcon>
                      <span className='fa fa-filter' aria-hidden='true' />
                  </PanelIcon>
                  {filter.title}
              </PanelBlock>
            })
          }
          <PanelBlock>
              <Button isOutlined isFullWidth isColor='primary'> Réinitialiser les filtres</Button>
          </PanelBlock>
      </Panel>
      </div>
    );
  }

}
