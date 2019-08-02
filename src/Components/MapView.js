import { Component } from "react";
import * as React from "react";
import { Map, GoogleApiWrapper, Polyline, Marker } from "google-maps-react";
import Button from "@material-ui/core/Button";
import { Icon } from "@material-ui/core";
class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: [],
      markerCoord: []
    };
  }

  componentDidMount() {
    var polyline = require("google-polyline");
    var directionsService = new window.google.maps.DirectionsService();

    let stops = [];
    let state = Object.assign({}, this.state);
    if (this.props.route.stops.length === 0) {
      stops.push({ lat: 12.9304278, lng: 77.678404 });
      stops.push({ lat: 12.9240682, lng: 77.64554079999994 });
      stops.push({ lat: 12.9220882, lng: 77.66572769999993 });
      stops.push({ lat: 12.9255622, lng: 77.63709010000002 });

      this.state.markerCoord.push({ lat: 12.9240682, lng: 77.64554079999994 });
      this.state.markerCoord.push({ lat: 12.9220882, lng: 77.66572769999993 });
      this.state.markerCoord.push({ lat: 12.9255622, lng: 77.63709010000002 });
      this.state.markerCoord.push({ lat: 12.9304278, lng: 77.678404 });
      this.state.markerCoord.push({ lat: 12.9240881, lng: 77.64962639999999 });
    } else {
      for (let stop of this.props.route.stops) {
        stops.push(stop.location);
        this.state.markerCoord.push(stop.location);
      }
    }
    this.setState(state);

    // console.log(this.state.markerCoord);
    var start = stops[0];
    var end = stops[stops.length - 1];
    let waypoints = [];
    for (let i = 1; i < stops.length - 1; i++) {
      waypoints.push({
        location: stops[i],
        stopover: true
      });
    }
    var request = {
      origin: start,
      destination: end,
      waypoints: waypoints,
      travelMode: "DRIVING"
    };

    let i = 1;
    directionsService.route(
      request,
      function(response, status) {
        let state = Object.assign({}, this.state);
        // console.log(response.routes);
        for (let route of response.routes) {
          for (let coord of polyline.decode(route["overview_polyline"])) {
            state.coords.push({ lat: coord[0], lng: coord[1] });
            // console.log(coord);
          }
        }
        this.setState(state);
      }.bind(this)
    );
  }

  render() {
    if (this.state.coords.length === 0) {
      return <div />;
    }
    const start = "start";
    const destination = "destination";
    const stops = "stop";
    const { google } = this.props;
    const markers = this.state.markerCoord.map(coord => (
      <Marker
        title={stops}
        // key={value}
        icon={{
          url: "https://img.icons8.com/cotton/48/000000/trolleybus--v2.png",
          anchor: new google.maps.Point(18, 30),
          scaledSize: new google.maps.Size(30, 30)
        }}
        position={{ lat: coord.lat, lng: coord.lng }}
      />
    ));
    return (
      <div style={{ margin: "5%" }}>
        <Button onClick={this.props.close}>Back</Button>
        <Map
          google={this.props.google}
          initialCenter={{
            lat: this.state.coords[0].lat,
            lng: this.state.coords[0].lng
          }}
          style={{ width: "90%", height: "80%" }}
          google={this.props.google}
          zoom={14}
        >
          {markers}

          <Polyline
            options={{
              path: this.state.coords,
              geodesic: true,
              strokeColor: "#ff2527",
              strokeOpacity: 0.75,
              strokeWeight: 2
            }}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDQZLggDBMiZ4fqVIT7lTe7A44WwA2EY4M"
})(MapView);
