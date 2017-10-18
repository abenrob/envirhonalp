import React, { Component } from 'react'
import { render } from 'react-dom'
import mapboxgl from 'mapbox-gl'
import { point as turf_point, feature as turf_feature, featureCollection as turf_featureCollection } from '@turf/helpers'

const mapStyle = `https://openmaptiles.github.io/klokantech-terrain-gl-style/style-cdn.json?key=${process.env.REACT_APP_MAPKEY}`

export default class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mapReady: false
    }
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: mapStyle,
      center: [4.5, 44.9],
      zoom: 6.5
    })

    this.map.on('load', () => {
      this.map.addSource('projectSource', {
        type: 'geojson',
        data: turf_featureCollection([])
      })

      this.map.addLayer({
        id: 'projects',
        type: 'circle',
        source: 'projectSource',
        'paint': {
          'circle-radius': {
            'stops': [[0, 2], [8, 6], [16, 40]]
          },
          'circle-color': '#38a1ad',
          'circle-stroke-width': {
            'stops': [[0, 1], [8, 2], [16, 8]]
          },
          'circle-stroke-color': '#fff'
        }
      })

      this.map.on('click', 'projects', (e) => {
        new mapboxgl.Popup()
          .setLngLat(e.features[0].geometry.coordinates)
          .setHTML(this.popUpContent(e.features[0].properties))
          .addTo(this.map)
      })

      this.map.on('mouseenter', 'projects', () => {
        this.map.getCanvas().style.cursor = 'pointer'
      })

      this.map.on('mouseleave', 'projects', () => {
        this.map.getCanvas().style.cursor = ''
      })

      this.setState({ mapReady: true })
      this.mapIsLoaded()
    })
  }

  mapIsLoaded() {
    this.props.mapReadyNotify()
  }

  componentDidUpdate() {
    if (this.state.mapReady) {
      const projectMap = this.props.projects.map(project => {
        return turf_point([project.longitude, project.latitude], project)
      })

      const mapData = turf_featureCollection(projectMap)

      this.map.getSource('projectSource').setData(mapData)
    }

    if (this.state.mapReady && this.props.searchResult.type) {
      console.log('registered')
    }
  }

  popUpContent(properties) {
    return `<p><strong>Producteur: </strong>${properties.producteur}</p>
    <p><strong>Date: </strong>${properties.date} <strong>Source: </strong>${properties.source}</p>
    <p><strong>Géographique: </strong>${properties.couverture_geographique}</p>
    <p><strong>Type de projet: </strong>${properties.projets_observatoires}</p>
    <p><strong>Type de données: </strong>${properties.type_de_donnees}</p>`
  }

  render() {

    return (
      <div
        ref={el => this.mapContainer = el}
        className="map-container"
      />
    );
  }

}
