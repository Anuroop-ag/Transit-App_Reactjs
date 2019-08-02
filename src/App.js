import React, { Component } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import View from "./Components/View.js";
import MapView from "./Components/MapView.js";
import Header from "./Components/Header.js";
import Upload from "./Components/FileUpload.js";
const useStyles = makeStyles(theme => ({
  root: {
    // width: '100%',
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

class App extends Component {
  state = {
    open: false,
    add: false,
    view: false,
    activeRoute: -1,
    emptyRoute: {
      name: "EX-101",
      direction: "UP",
      id: "1",
      status: "Active",
      stops: [], //stopId's
      type: "AC"
    },
    routes: [
      {
        name: "EX-101",
        direction: "UP",
        id: "1",
        status: "Active",
        stops: [], //stopId's
        type: "AC"
      }
    ]
  };

  componentDidMount() {
    // ** following two lines of code do the same thing
    // using the first version, however, could potentially cause errors
    // see "Referencing unimported libraries when using create-react-app"
    // $(this.refs.list).fadeOut(); // version 1
    // window.$(this.refs.list).fadeOut(); // version 2
  }

  viewRoutes = () => {
    let children = [];
    let i = 0;

    for (let route of this.state.routes) {
      children.push(
        <TableRow key={route.name}>
          <TableCell component="th" scope="row">
            {route.name}
          </TableCell>
          <TableCell component="th" scope="row">
            <Button
              color="secondary"
              style={{ float: "right" }}
              onClick={this.deleteRoute.bind(this, i)}
            >
              Delete
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={this.openRoute.bind(this, i)}
            >
              Edit
            </Button>
            <Button
              color="primary"
              style={{ float: "right" }}
              onClick={this.openView.bind(this, i)}
            >
              View
            </Button>
          </TableCell>
        </TableRow>
      );
      i++;
    }

    return <TableBody>{children}</TableBody>;
  };

  openRoute(index) {
    let state = Object.assign({}, this.state);
    state.activeRoute = index;
    state.add = true;

    this.setState(state);
  }

  deleteRoute(index) {
    let state = Object.assign({}, this.state);
    state.routes.splice(index, 1);
    this.setState(state);
  }

  openModal = () => {
    this.setState({ add: true, activeRoute: -1 });
  };
  closeModal = () => {
    this.setState({ add: false, activeRoute: -1 });
  };

  saveRoute = (route, index) => {
    if (route.name === "" || route.id === "") {
      alert("please fill the details");
    } else if (route.stops.length < 2) {
      alert("Select Start and Destination places");
    } else {
      let state = Object.assign({}, this.state);
      if (index === -1) {
        state.routes.push(route);
      }
      state.add = false;
      state.activeRoute = -1;
      this.setState(state);
    }
  };

  openView = index => {
    let state = Object.assign({}, this.state);
    state.activeRoute = index;
    state.view = true;
    this.setState(state);
  };

  closeMapView = () => {
    this.setState({ view: false });
  };

  render() {
    const { classes } = this.props;
    // console.log(this.state.routes[0]);
    return (
      <div>
        <Header />
        {this.state.view ? (
          <MapView
            index={this.state.activeRoute}
            route={
              this.state.activeRoute === -1
                ? this.state.routes[0]
                : this.state.routes[this.state.activeRoute]
            }
            close={this.closeMapView}
          />
        ) : this.state.add ? (
          // <Upload/>

          <View
            index={this.state.activeRoute}
            route={
              this.state.activeRoute === -1
                ? this.state.emptyRoute
                : this.state.routes[this.state.activeRoute]
            }
            close={this.closeModal}
            saveRoute={this.saveRoute}
          />
        ) : (
          <div>
            <Paper style={{ margin: "10%" }} className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: 20, color: "black" }}>
                      Routes{" "}
                    </TableCell>
                    <TableCell>
                      <Button
                        style={{ float: "right" }}
                        onClick={this.openModal}
                      >
                        New
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>

                {this.viewRoutes()}
              </Table>
            </Paper>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(useStyles)(App);
