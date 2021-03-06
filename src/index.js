import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import MapContainer from "./components/MapContainer";
import Cart from "./components/Cart";

import rootReducer from "./reducer";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { selectNursery, initializeState } from "./actionCreators";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./styles.css";

function mapDispatchToProps(dispatch) {
  return {
    selectNursery: id => dispatch(selectNursery(id)),
    initializeState: json => dispatch(initializeState(json))
  };
}
function mapStateToProps(state) {
  return {
    selectedNursery: state.selectedNursery,
    nurseries: state.nurseries
  };
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      error: false
    };
  }
  componentDidMount() {
    const self = this;
    fetch("https://api.myjson.com/bins/hq9bo")
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log("api response==", myJson);
        self.props.initializeState(myJson);
      })
      .catch(e => {
        this.setState({
          error: true
        });
      });
  }
  render() {
    const { selectedNursery, nurseries, selectNursery } = this.props;
    if (this.state.error) {
      return (
        <Fragment>
          <h1>Sorry for the inconvenience.</h1>
          <p>
            There's been an error loading the data. Pleasecheck your internet
            connection and reload
          </p>
        </Fragment>
      );
    }
    return (
      <div>
        <MapContainer
          selectedNursery={selectNursery}
          nurseries={nurseries}
          selectNursery={selectNursery}
        />
        <Cart
          selectedNursery={nurseries.find(nursery => {
            return nursery.id === selectedNursery;
          })}
        />
      </div>
    );
  }
}

const store = createStore(rootReducer);
const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <ConnectedApp />
  </Provider>,
  rootElement
);
