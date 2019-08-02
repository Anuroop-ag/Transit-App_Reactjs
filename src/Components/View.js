import { Component } from "react";
import * as React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import Upload from "./FileUpload.js";

const viewStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

class View extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: "",
      name: props.route.name,
      direction: props.route.direction,
      id: props.route.id,
      status: props.route.status,
      stops: props.route.stops,
      type: props.route.type
    };
  }

  handleChangeAddress = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    let stop = {};
    let state = Object.assign({}, this.state);
    geocodeByAddress(address)
      .then(results => {
        stop.name = results[0].formatted_address;
        return getLatLng(results[0]);
      })
      .then(latLng => {
        stop.location = latLng;
        // console.log(state);
        state.stops.push(stop);
        this.setState(state);
        // console.log("Success", stop);
      })
      .catch(error => console.error("Error", error));
  };

  handleDelete = index => {
    let state = Object.assign({}, this.state);
    state.stops.splice(index, 1);
    this.setState(state);
  };

  componentWillReceiveProps(nextProps) {
    let state = {
      address: "",
      name: nextProps.route.name,
      direction: nextProps.route.direction,
      id: nextProps.route.id,
      status: nextProps.route.status,
      stops: nextProps.route.stops,
      type: nextProps.route.type
    };

    this.setState(state);
  }

  handleChange = event => {
    let state = Object.assign({}, this.state);

    state[event.target.name] = event.target.value;
    this.setState(state);
  };

  viewStops = () => {
    const { classes } = this.props;
    let children = [];
    let i = 0;
    console.log(this.state.stops);
    if (this.state.stops.length === 0 && this.state.name === "EX-999") {
      let state = Object.assign({}, this.state);
      this.state.stops.push({
        name: "Bellandur, Bengaluru, Karnataka, India",
        location: { lat: 12.9304278, lng: 77.678404 }
      });
      this.state.stops.push({
        name:
          "Iblur Park, Outer Ring Rd, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103, India",
        location: { lat: 12.9220882, lng: 77.66572769999993 }
      });

      this.state.stops.push({
        name:
          "Barbeque nation, 1st Block Koramangala, Koramangala, Bengaluru, Karnataka 560034, India",
        location: { lat: 12.9255622, lng: 77.63709010000002 }
      });
      this.setState(state);
    }
    for (let stop of this.state.stops) {
      children.push(
        <div key={i} style={{ marginBottom: 10 }}>
          <Chip
            color="primary"
            label={stop.name}
            onDelete={this.handleDelete.bind(this, i)}
            className={classes.chip}
          />
        </div>
      );
      i++;
    }
    return children;
  };

  render() {
    const { classes } = this.props;
    // this.state.name = "";
    return (
      <div style={{ margin: "10%", marginLeft: "30%", marginRight: "30%" }}>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="standard-name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
            margin="normal"
            placeholder="EX-101"
          />
          <br />
          <TextField
            id="standard-name"
            label="ID"
            className={classes.textField}
            value={this.state.id}
            name="id"
            onChange={this.handleChange}
            margin="normal"
          />
          <br />
          <br />
          <FormLabel component="legend">Direction</FormLabel>
          <RadioGroup
            id="standard-name"
            name="direction"
            className={classes.group}
            value={this.state.direction}
            onChange={this.handleChange}
            margin="normal"
            row
          >
            <FormControlLabel value="UP" control={<Radio />} label="UP" />
            <FormControlLabel value="DOWN" control={<Radio />} label="Down" />
          </RadioGroup>
          <br />
          <FormLabel component="legend">Status</FormLabel>
          <RadioGroup
            id="standard-name"
            name="status"
            className={classes.group}
            value={this.state.status}
            onChange={this.handleChange}
            margin="normal"
            row
          >
            <FormControlLabel
              value="Active"
              control={<Radio />}
              label="Active"
            />
            <FormControlLabel
              value="Inactive"
              control={<Radio />}
              label="Inactive"
            />
          </RadioGroup>
          <br />
          <FormLabel component="legend">Type</FormLabel>
          <RadioGroup
            id="standard-name"
            name="type"
            className={classes.group}
            value={this.state.type}
            onChange={this.handleChange}
            margin="normal"
            row
          >
            <FormControlLabel value="AC" control={<Radio />} label="AC" />
            <FormControlLabel
              value="NOC-AC"
              control={<Radio />}
              label="NON-AC"
            />
          </RadioGroup>
          <br />

          <FormLabel component="legend">Stops</FormLabel>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChangeAddress}
            onSelect={this.handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading
            }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input search"
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: "#fafafa", cursor: "pointer" }
                      : { backgroundColor: "#ffffff", cursor: "pointer" };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          {this.viewStops()}
          <br />
          <FormLabel components="legend"> Upload File</FormLabel>
          <div>
            <Upload />
          </div>

          <br />
          <Button
            style={{ float: "right" }}
            color="primary"
            onClick={() => {
              this.props.saveRoute(this.state, this.props.index);
            }}
          >
            Save
          </Button>
          <Button
            style={{ float: "right", marginLeft: 10 }}
            color="secondary"
            onClick={() => {
              this.props.close();
            }}
          >
            Cancel
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(viewStyles)(View);
