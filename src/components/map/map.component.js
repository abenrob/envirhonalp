import React, { Component } from 'react';
import { render } from 'react-dom';
import MapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import axios from 'axios';

import ProjectPin from './project-pin';
import ProjectInfo from './project-info';

const navStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const mapStyle = `https://openmaptiles.github.io/dark-matter-gl-style/style-cdn.json?key=${process.env.REACT_APP_MAPKEY}`;

const fields = [
  'cartodb_id', 'liens', 'producteur', 'date', 'source', 
  'couverture_temporelle', 'couverture_geographique', 'type_de_donnees',
  'theme_1', 'theme_2', 'theme_3', 'theme_4', 'projets_observatoires'
];

const sql = `select ${fields.join(',')}, x as longitude, y as latitude 
from ${process.env.REACT_APP_SQLTABLE} where x is not null and y is not null`;

export default class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 44.9,
        longitude: 4.5,
        zoom: 6.5,
        bearing: 0,
        pitch: 30,
        width: 500,
        height: 500,
        attributionControl: true
      },
      popupInfo: null,
      projects: []
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
    axios.get(`${process.env.REACT_APP_SQLROOT}?q=${encodeURIComponent(sql)}`)
      .then(res => {
        const projects = res.data.rows;
        this.setState({ projects });
      });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: this.props.width || window.innerWidth,
        height: this.props.height || window.innerHeight -49
      }
    });
  };

  _updateViewport = (viewport) => {
    this.setState({viewport});
  }

  _renderMarker = (project, index) => {
    return (
      <Marker key={`marker-${index}`}
        longitude={project.longitude}
        latitude={project.latitude} >
        <ProjectPin size={20} onClick={() => this.setState({popupInfo: project})} />
      </Marker>
    );
  }

  _renderPopup() {
    const {popupInfo} = this.state;

    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        onClose={() => this.setState({popupInfo: null})} >
        <ProjectInfo info={popupInfo} />
      </Popup>
    );
  }

  render() {

    const {viewport} = this.state;

    return (
      <MapGL className="map-container"
        {...viewport}
        mapStyle={mapStyle}
        onViewportChange={this._updateViewport} >

        { this.state.projects.map(this._renderMarker) }

        { this._renderPopup() }

        <div className="map-nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>

      </MapGL>
    );
  }

}
