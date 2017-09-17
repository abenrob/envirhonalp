import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Map from './components/map/map.component'
import * as actions from './actions/actionTypes'
import logo from './logo.svg'
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
    super(props);
    this.state = {
      projects: [],
      filters: []
    }
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_SQLROOT}?q=${encodeURIComponent(sql)}`)
      .then(res => {
        const projects = res.data.rows
        this.setState({ projects: projects })

        // setTimeout(()=> {
        //   this.setState({projects: this.state.projects.filter((project) => project.date === '2014')})
        // },5000)
      })
  }

  render() {
    const {projects} = this.props
    return (
      <div className="App">
        <Hero isSize='small'>
          <HeroHeader>
            <Nav>
              <NavLeft>
                <NavItem isBrand><img src={logo} className="app-logo" alt="logo" /></NavItem>
                <NavItem>EnviRhonAlp</NavItem>
              </NavLeft>
            </Nav>
          </HeroHeader>
        </Hero>
        <Map projects={this.props.projects}></Map>
      </div>
    )
  }
}

//export default App;
function mapStateToProps(state, ownProps) {
  return { 
    projects: state.projects 
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)