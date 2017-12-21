import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { point as turf_point, featureCollection as turf_featureCollection } from '@turf/helpers'

const mapStyle = `https://openmaptiles.github.io/klokantech-terrain-gl-style/style-cdn.json?key=${process.env.REACT_APP_MAPKEY}`

export default class Map extends Component {

  constructor(props) {
    super(props)
    this.state = {
      mapReady: false
    }
  }

  formatPopup(properties) {
    var link = null
    if (properties.sites_web_de_reference === '' && properties.accessibilite3_point_d_acces !== '') {
      // check for mail
      if (properties.accessibilite3_point_d_acces.match(/[@]/g)){
        link = `<p><a href="mailto:${properties.accessibilite3_point_d_acces}">en savoir plus</a></p>`
      } else {
        link = `<p><a href="${properties.accessibilite3_point_d_acces}" target="_blank">en savoir plus</a></p>`
      }
    } else if (properties.sites_web_de_reference !== '') {
      link = `<p><a href="${properties.sites_web_de_reference}" target="_blank">en savoir plus</a></p>`
    } else {
      link = `<p><a href="mailto:contact@plateforme-ouranos.fr">en savoir plus</a></p>`
    }

    return `<p><strong>Nom: </strong>${properties.nom_projet_observatoire}</p>
      <p><strong>Lieu: </strong>${properties.couverture_geographique_modifiee}</p>
      <p><strong>Thèmes: </strong>${properties.themes}</p>
      <p><strong>Type de données: </strong>${properties.type_de_donnees_modifie}</p>
      <p><strong>Propriété des données: </strong>${properties.accessibilite_publique_privee}</p>
      <p><strong>Couverture temporelle: </strong>${properties.couverture_temporelle_debut} - ${properties.couverture_temporelle_fin}</p>  
      ${link}`
  }

  componentDidMount() {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: process.env.REACT_APP_MAPSTYLE,
      center: [4.5, 44.9],
      zoom: 6.5
    })

    this.map.addControl(new mapboxgl.NavigationControl(), 'top-left')

    this.map.on('load', () => {
      this.map.addSource('projectSource', {
        type: 'geojson',
        data: turf_featureCollection([]),
        // cluster: true,
        // clusterMaxZoom: 14,
        // clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
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
          .setHTML(this.formatPopup(e.features[0].properties))
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

  componentWillReceiveProps(newProps) {
    if (this.state.mapReady && newProps.projects) {
      const projectMap = newProps.projects.map(project => {
        return turf_point([project.longitude, project.latitude], project)
      })
  
      this.map.getSource('projectSource').setData(turf_featureCollection(projectMap))
    }
    
  }

  render() {
    return (
      <div
        ref={el => this.mapContainer = el}
        className="map-container"
      />
    )
  }

}
