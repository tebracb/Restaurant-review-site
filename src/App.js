import React from 'react';
import './App.css';
import { GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import restaurantData from "./restaurantData.json";

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
   
    const facilityPins = restaurantData.map(item => {
        return ( 

        <Marker onClick={this.onMarkerClick} 
        key={item.address}
          position={{
          lat: item.lat,
          lng: item.long,
        }}
        name = {item.restaurantName}
        icon = {URL="http://maps.google.com/mapfiles/ms/icons/purple-pushpin.png"}
        
        
        />
        )}
    )


      //   <div key= {item.address} lat={item.lat} lng={item.long}>
      //     {console.log(item.lat)}
      //     <img style={markerStyle} src={"https://maps.google.com/mapfiles/kml/paddle/grn-circle.png"} alt="pin" />
      //   </div>     
      // );
      
  
    return (
      <div>
      <CurrentLocation
      centerAroundCurrentLocation
      google={this.props.google}
    >
      <Marker onClick={this.onMarkerClick} name={'Current location'} />
      {facilityPins}
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
    
    </div>
    
      
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
