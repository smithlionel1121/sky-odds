import React, { Component, Fragment } from "react";
import { Route, Link } from "react-router-dom";

export default class Nav extends Component {
  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Sky Odds
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor03"
            aria-controls="navbarColor03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="admin">
                  Admin
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="api">
                  Api
                </a>
              </li>
              <li className="nav-item">
                <Route>
                  <Link to="/data" className="nav-link">
                    Charts
                  </Link>
                </Route>
              </li>
            </ul>
          </div>
        </nav>
      </Fragment>
    );
  }
}
