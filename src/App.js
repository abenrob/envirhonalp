import React, { Component } from 'react'
import axios from 'axios'
import Map from './components/map/map.component'
import Immutable from 'immutable'
import FilterMenu from './components/filter/filter.component'
import DateDomains from './utilities/dateDomains.utility'
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
  {name: "accessibilite_publique_privee"},
  {name: "accessibilite3_point_d_acces"},
]

const sql = `select ${fields.map(field => field.name).join(',')}, longitude, latitude 
from ${process.env.REACT_APP_SQLTABLE} where longitude is not null and latitude is not null and longitude != '' and latitude != ''`

class App extends Component {

  constructor(props) {
    super(props)
    this.defaults = {
      temporal: Immutable.List([0,100])
    }
    this.state = {
      projects: [],
      filters: {},
      sliderRange: this.defaults.temporal.toJS()
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
          mapReadyNotify={this.mapReadyForData}
        ></Map>
        <FilterMenu
          resetFilters={this.resetFilters}
          sliderRange={this.state.sliderRange}
          onSliderChange={this.sliderChange}
          onFilterChange={this.filterChange}
          filters={this.state.filters}
        ></FilterMenu>
      </div>
    )
  }

  filterProjects = () => {
    const filters = Object.keys(this.state.filters).map(key => {
      return {
        field: key, 
        string: this.state.filters[key].values.filter(val => val.checked).map(filt => filt.name).join()
      }
    })

    const projects = this.defaults.projects.toJS().filter(project => {
      for (let filter of filters){
        const projectFilters = project[filter.field].split(',').map(f => f.trim())
        if (!projectFilters.some(f => filter.string.includes(f))) {
          return false
        }
      }
      
      if (this.state.sliderRange.join() !== this.defaults.temporal.toJS().join()) {
        const actuals = DateDomains.valueDateLookup(this.state.sliderRange)
        const pStart = Number(project.couverture_temporelle_debut)
        if (this.state.sliderRange[0] > this.defaults.temporal.toJS()[0]) {
          if (!pStart || pStart < actuals[0]) {
            return false
          }
        }

        const pEnd = Number(project.couverture_temporelle_fin)
        if (this.state.sliderRange[1] < this.defaults.temporal.toJS()[1]) {
          if (!pEnd || pEnd > actuals[1]) {
            return false
          }
        }

      }

      return true
    })

    this.setState({projects: projects})
  }

  filterChange = (filter) => {
    const filtersCopy = {...this.state.filters}
    const filterIndex = filtersCopy[filter.field].values.findIndex(f => f.name === filter.name)
    filtersCopy[filter.field].values[filterIndex].checked = filter.checked
    this.setState({filters: filtersCopy}, () => {
      this.filterProjects()
    })
  }

  sliderChange = (values) => {
    this.setState({ sliderRange: values }, () => {
      this.filterProjects()
    })
  }

  resetFilters = () => {
    this.setState({ 
      projects: this.defaults.projects.toJS(), 
      filters: this.defaults.filters.toJS(), 
      sliderRange: this.defaults.temporal.toJS()
    })
  }

  mapReadyForData = () => {
    this.setState(this.state)
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_SQLROOT}?q=${encodeURIComponent(sql)}`)
      .then(res => {
        let projects = res.data.rows
        
        projects.forEach(project => {
          project.couverture_temporelle_fin = project.couverture_temporelle_fin ? project.couverture_temporelle_fin : 'aujourd\'hui'
        })
        
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

        // set immutable references for reset functions
        this.defaults.projects = Immutable.fromJS(projects)
        this.defaults.filters = Immutable.fromJS(filters)

        // set state
        this.setState({ projects: projects, filters: filters })
      })

  }
}

export default App
