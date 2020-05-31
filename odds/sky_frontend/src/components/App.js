import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "../store";

import Nav from "./layout/Nav";
import Form from "./match/Form";
import Chart from "./match/Chart";

export class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Nav />
            <h1 className="text-center" style={{ paddingBottom: "2rem" }}>
              Sky Odds App
            </h1>
            <Switch>
              <Route exact path="/" component={Form} />
              <Route path="/data" component={Chart} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
