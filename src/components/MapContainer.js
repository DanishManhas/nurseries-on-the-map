import React from "react";
// import { Map } from "google-maps-react";
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import CurrentLocation from "./Map";
import LeafIcon from "./../../public/plant.svg";

export class MapContainer extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showingInfoWindow: false, //Hides or the shows the infoWindow
      activeMarker: {}, //Shows the active marker upon click
      selectedPlace: {} //Shows the infoWindow to the selected place upon a marker,
    };
  }

  onMarkerClick = (props, marker, e) => {
    this.setState(
      {
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      },
      () => {
        if (props.name !== "current location")
          this.props.selectNursery(props.value);
      }
    );
  };

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
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        <Marker onClick={this.onMarkerClick} name={"current location"} />
        {this.props.nurseries &&
          this.props.nurseries.map(place => {
            return (
              <Marker
                key={place.id}
                value={place.id}
                onClick={this.onMarkerClick}
                name={place.name}
                position={{ lat: place.latitude, lng: place.longitude }}
                icon={{
                  url: LeafIcon,
                  anchor: new this.props.google.maps.Point(32, 32),
                  scaledSize: new this.props.google.maps.Size(64, 64)
                }}
              />
            );
          })}
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
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDEBJcD-nGCOSzbDbPJyD3bMaHbFpgWUls"
})(MapContainer);
