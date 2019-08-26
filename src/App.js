import React from 'react';
import './App.css';
import { GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

import CurrentLocation from './Map';

export class MapContainer extends React.Component {

  constructor(props){
    super(props)
  }

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
  this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  });

onClose = props => {
  if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    });
  }
};

  render() {

    return (
      <CurrentLocation
      centerAroundCurrentLocation
      google={this.props.google}
    >
      <Marker onClick={this.onMarkerClick} name={'current location'} />
      <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        
    </CurrentLocation>
      
      //   <Map
      //     google={this.props.google}
      //     zoom={14}
      //     style={mapStyles}
      //     initialCenter={{ lat: 51.442, lng: 5.469}}
      //  />
    )
  }
}



export default GoogleApiWrapper({
  apiKey: "AIzaSyDbdKdJc9wSQ83SQAX9B34xJ_cydDMUQnQ"
})(MapContainer);
