import React, { Component } from 'react'
import axios from 'axios'
import Map from './components/map/map.component'
import logo from './logo.png'
import {
  Hero, HeroHeader, Nav, NavLeft, NavItem
} from 'bloomer'
import './App.css'

const fields = [
  'cartodb_id', 'liens', 'producteur', 'date', 'source', 
  'couverture_temporelle', 'couverture_geographique', 'type_de_donnees',
  'theme_1', 'theme_2', 'theme_3', 'theme_4', 'projets_observatoires'
]

const sql = `select ${fields.join(',')}, x as longitude, y as latitude 
from ${process.env.REACT_APP_SQLTABLE} where x is not null and y is not null`

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
