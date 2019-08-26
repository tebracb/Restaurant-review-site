import React from "react";
import ReactDOM from "react-dom";
// import restaurantData from "restaurantData.js"

const mapStyles = {
    map: {
      position: 'absolute',
      width: '80%',
      height: '100%'
    }
  };

  // const facilityPins = this.props.facilities.map((facility, index) => {
  //   return <FacilityPin onClick = {() => this.setPinAsCenter(facility)} key = {index} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}
  //   handlePinClick={this.handleOnClick} facility={facility} hover={this.state.hover} lat={facility.latitude} lng={facility.longitude}
  // />
  // });

export class CurrentLocation extends React.Component {
   
    constructor(props){
        super(props);

        const { lat, lng } = this.props.initialCenter;
        this.state = {
            currentLocation: {
            lat: lat,
            lng: lng
        },
        //     markerLocation: {
        //     latMarker: this.props.lat,
        //     lngMarker: this.props.lng
           
        // }
    };
    }
      
    // displayMarkers = () => {
    //     return restaurantData.map(restaurant => {
    //       return <Marker key={index} id={index} position={{
    //        lat: restaurant.lat,
    //        lng: restaurant.long
    //      }}
    //      onClick={() => console.log("You clicked me!")} />
    //     })
    //   }

    // // https://medium.com/@mattcroak718/google-map-react-beginners-guide-85bb1a94b04a
    

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
          this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
          this.recenterMap();
        }
      }


      recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;
    
        const google = this.props.google;
        const maps = google.maps;
    
        if (map) {
          let center = new maps.LatLng(current.lat, current.lng);
          map.panTo(center);
        }
      }
    

      componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
          if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
              const coords = pos.coords;
              this.setState({
                currentLocation: {
                  lat: coords.latitude,
                  lng: coords.longitude
                }
              });
            });
          }
        }
        this.loadMap();
      };



      loadMap() {
        if (this.props && this.props.google) {
          // checks if google is available
          const { google } = this.props;
          const maps = google.maps;
    
          const mapRef = this.refs.map;
    
          // reference to the actual DOM element
          const node = ReactDOM.findDOMNode(mapRef);
    
          let { zoom } = this.props;
          const { lat, lng } = this.state.currentLocation;
          const center = new maps.LatLng(lat, lng);
          const mapConfig = Object.assign(
            {},
            {
              center: center,
              zoom: zoom
            }
          );
    
          // maps.Map() is constructor that instantiates the map
          this.map = new maps.Map(node, mapConfig);
        }
      }

      renderChildren() {
        const { children } = this.props;
    
        if (!children) return;
    
        return React.Children.map(children, c => {
          if (!c) return;
          return React.cloneElement(c, {
            map: this.map,
            google: this.props.google,
            mapCenter: this.state.currentLocation
          });
        });
      }
    


      render() {
        const style = Object.assign({}, mapStyles.map);
       return (
         <div>
           <div style={style} ref="map">
             Loading map...
           </div>
           {this.renderChildren()}
           {/* {facilityPins} */}
         </div>
       );
     }
}



export default CurrentLocation;

CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter: {
        lat: 51.442,
        lng: 6.469
    },
    centerAroundCurrentLocation: false,
    visible: true
};
