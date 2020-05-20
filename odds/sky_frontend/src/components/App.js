import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";

import store from "../store";

import Nav from "./layout/Nav";
import Form from "./match/Form";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Nav />
          <h1 className="text-center" style={{ paddingBottom: "2rem" }}>
            Sky Odds App
          </h1>
          <Form />
        </Fragment>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
