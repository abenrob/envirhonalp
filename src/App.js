import React, { Component } from 'react'
import axios from 'axios'
import Map from './components/map/map.component'
import Search from './components/search/search.component'
import logo from './logo.png'
import {
  Hero, HeroHeader, Nav, NavLeft, NavItem
} from 'bloomer'
import './App.css'

const fields = [
  "sites_web_de_reference",
  "nom_projet_observatoire",
  "themes",
  "detail_donnees_mesurees",
  "type_de_donnees_modifie",
  "couverture_geographique_modifiee",
  "couverture_temporelle_debut",
  "couverture_temporelle_fin",
  "base_de_reference",
  "accessibilite3_point_d_acces",
]

const sql = `select ${fields.join(',')}, longitude, latitude 
from ${process.env.REACT_APP_SQLTABLE} where longitude is not null and latitude is not null`

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      projects: []
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
        ></Map>
        <Search></Search>
      </div>
    )
  }

  mapReadyForData() {
    this.setState(this.state)
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_SQLROOT}?q=${encodeURIComponent(sql)}`)
      .then(res => {
        const projects = res.data.rows
        this.setState({ projects: projects })
      })
  }
}

export default App
