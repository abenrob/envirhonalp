import React, { Component } from 'react'
import { render } from 'react-dom'
import { Geocoder } from '@mapbox/react-geocoder'

export default class SearchZoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      latitude: Infinity,
      longitude: Infinity
    };
  }

  onSelect(selection) {
    console.log(selection)
  }

  render() {
    return (
      <div>
        <Geocoder
          accessToken={process.env.REACT_APP_MAPBOX}
          onSelect={this.onSelect}
          showLoader={true}
        />
      </div>
    );
  }
}