import React, { Component } from "react";
import ReactDOM from "react-dom";
import CSVReader from "react-csv-reader";
import "./FileUpload.css";

class Upload extends Component {
  state = {};

  handleForce = data => {
    console.log(data);
  };

  render() {
    return (
      <CSVReader
        className="Reader"
        cssClass="csv-reader-input"
        label=""
        onFileLoaded={this.handleForce}
        onError={this.handleDarkSideForce}
        inputId="ObiWan"
        inputStyle={{ color: "#ffffff" }}
      />
    );
  }
}

export default Upload;
