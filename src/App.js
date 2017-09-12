import React, { Component } from 'react';
import Map from './components/map/map.component';
import logo from './logo.svg';
import {
  Hero, HeroHeader, Nav, NavLeft, NavItem
} from 'bloomer';
import './App.css';

class App extends Component {
  render() {
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
        <Map></Map>
      </div>
    );
  }
}

export default App;
