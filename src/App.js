import React, { Component } from 'react'
import axios from 'axios'
import Map from './components/map/map.component'
import FilterMenu from './components/filter/filter.component'
import logo from './logo.png'
import {
  Hero, HeroHeader, Nav, NavLeft, NavItem
} from 'bloomer'
import './App.css'

const fields = [
  {name: "sites_web_de_reference"},
  {name: "nom_projet_observatoire"},
  {name: "themes", filter: true, display: "Thèmes"},
  {name: "detail_donnees_mesurees"},
  {name: "type_de_donnees_modifie", filter: true, display: "Type de données"},
  {name: "couverture_geographique_modifiee"},
  {name: "couverture_temporelle_debut"},
  {name: "couverture_temporelle_fin"},
  {name: "base_de_reference"},
  {name: "accessibilite3_point_d_acces"},
]

const sql = `select ${fields.map(field => field.name).join(',')}, longitude, latitude 
from ${process.env.REACT_APP_SQLTABLE} where longitude is not null and latitude is not null`

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      filters: {}
    }
  }

  render() {
    return (
      <div className="App">
        <Hero isSize='small'>
          <HeroHeader>
            <Nav>
              <NavLeft>
                <NavItem isBrand><img src={logo} className="app-logo" alt="logo" /></NavItem>
                <NavItem>Données climat en montagne</NavItem>
              </NavLeft>
            </Nav>
          </HeroHeader>
        </Hero>
        <Map 
          projects={this.state.projects}
          mapReadyNotify={this.mapReadyForData.bind(this)}
          filters={this.state.filters}
        ></Map>
        <FilterMenu
          onFilterChange={this.filterChange}
          filters={this.state.filters}
        ></FilterMenu>
      </div>
    )
  }

  filterChange = (filter) => {
    console.log('change')
    const filtersCopy = {...this.state.filters}
    const filterIndex = filtersCopy[filter.field].values.findIndex(f => f.name === filter.name)
    filtersCopy[filter.field].values[filterIndex].checked = filter.checked
    this.setState({filters: filtersCopy})
  }

  mapReadyForData() {
    this.setState(this.state)
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_SQLROOT}?q=${encodeURIComponent(sql)}`)
      .then(res => {
        const projects = res.data.rows
        const filters = fields.filter(field => field.filter).reduce((result, item) => {
          const key = item.name
          result[key] = {name: item.display, values:[].concat(...projects.map(
            project => project[key]
              .split(',')
              .map(val => val.trim())
          )).filter((elem, pos, arr) => {
            return arr.indexOf(elem) === pos && elem !== ""
          }).sort().map(filter => {
            return {name: filter, checked: true}
          }) }
          return result
        }, {})

        this.setState({ projects: projects, filters: filters })
      })

  }
}

export default App
