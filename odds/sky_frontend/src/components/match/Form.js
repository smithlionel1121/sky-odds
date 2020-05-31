import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addMatch } from "../../actions/match";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const baseUrl = "https://m.skybet.com/football/football-live/event/";
const home_team = "Home";
const away_team = "Away";

class Form extends Component {
  state = {
    eventUrl: "",
    homeOddsNumerator: "",
    homeOddsDenominator: "",
    drawOddsNumerator: "",
    drawOddsDenominator: "",
    awayOddsNumerator: "",
    awayOddsDenominator: "",
    kick_off: "",
  };

  static propTypes = {
    addMatch: PropTypes.func.isRequired,
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const {
      eventUrl,
      homeOddsNumerator,
      homeOddsDenominator,
      drawOddsNumerator,
      drawOddsDenominator,
      awayOddsNumerator,
      awayOddsDenominator,
      kick_off,
    } = this.state;

    const sky_url = baseUrl + eventUrl;
    const home_odds = decimalOdds(homeOddsNumerator, homeOddsDenominator);
    const draw_odds = decimalOdds(drawOddsNumerator, drawOddsDenominator);
    const away_odds = decimalOdds(awayOddsNumerator, awayOddsDenominator);

    const match = {
      sky_url,
      home_odds,
      draw_odds,
      away_odds,
      kick_off,
      home_team,
      away_team,
    };
    this.props.addMatch(match);

    this.setState({
      eventUrl: "",
      homeOddsNumerator: "",
      homeOddsDenominator: "",
      drawOddsNumerator: "",
      drawOddsDenominator: "",
      awayOddsNumerator: "",
      awayOddsDenominator: "",
      kick_off: "",
    });
  };

  render() {
    const {
      eventUrl,
      homeOddsNumerator,
      homeOddsDenominator,
      drawOddsNumerator,
      drawOddsDenominator,
      awayOddsNumerator,
      awayOddsDenominator,
      kick_off,
    } = this.state;
    return (
      <Fragment>
        <form className="mx-md-3" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="control-label">Sky Event URL:</label>
            <div className="form-group">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">...event/</span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  aria-label="URL Match ID"
                  name="eventUrl"
                  onChange={this.onChange}
                  value={eventUrl}
                />
              </div>
            </div>
          </div>

          <div className="container-fluid pt-4">
            <div className="form-group row">
              <div className="col" id="homeOddsAccordian">
                <div className="row">
                  <div className="form-check form-check-inline col d-flex justify-content-center">
                    <input
                      type="checkbox"
                      name=""
                      id="homeOddsCheck"
                      className="form-check-inline"
                      data-toggle="collapse"
                      data-target="#homeOddsInput"
                    />
                    <label htmlFor="homeOddsCheck" className="form-check-label">
                      Home Odds
                    </label>
                  </div>
                </div>
                <div
                  className="row mx-auto collapse"
                  id="homeOddsInput"
                  data-parent="#homeOddsAccordian"
                >
                  <div className="col d-flex justify-content-center">
                    <input
                      type="number"
                      name="homeOddsNumerator"
                      id=""
                      className="form-control"
                      value={homeOddsNumerator}
                      onChange={this.onChange}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">/</span>
                    </div>
                    <input
                      type="number"
                      name="homeOddsDenominator"
                      id=""
                      className="form-control"
                      value={homeOddsDenominator}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col" id="drawOddsAccordian">
                <div className="row">
                  <div className="form-check form-check-inline col d-flex justify-content-center">
                    <input
                      type="checkbox"
                      name=""
                      id="drawOddsCheck"
                      className="form-check-inline"
                      data-toggle="collapse"
                      data-target="#drawOddsInput"
                    />
                    <label htmlFor="drawOddsCheck" className="form-check-label">
                      Draw Odds
                    </label>
                  </div>
                </div>
                <div
                  className="row mx-auto collapse"
                  id="drawOddsInput"
                  data-parent="#drawOddsAccordian"
                >
                  <div className="col d-flex justify-content-center">
                    <input
                      type="number"
                      name="drawOddsNumerator"
                      id=""
                      className="form-control"
                      value={drawOddsNumerator}
                      onChange={this.onChange}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">/</span>
                    </div>
                    <input
                      type="number"
                      name="drawOddsDenominator"
                      id=""
                      className="form-control"
                      value={drawOddsDenominator}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col" id="awayOddsAccordian">
                <div className="row">
                  <div className="form-check form-check-inline col d-flex justify-content-center">
                    <input
                      type="checkbox"
                      name=""
                      id="awayOddsCheck"
                      className="form-check-inline"
                      data-toggle="collapse"
                      data-target="#awayOddsInput"
                    />
                    <label htmlFor="awayOddsCheck" className="form-check-label">
                      Away Odds
                    </label>
                  </div>
                </div>
                <div
                  className="row mx-auto collapse"
                  id="awayOddsInput"
                  data-parent="#awayOddsAccordian"
                >
                  <div className="col d-flex justify-content-center">
                    <input
                      type="number"
                      name="awayOddsNumerator"
                      id=""
                      className="form-control"
                      value={awayOddsNumerator}
                      onChange={this.onChange}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">/</span>
                    </div>
                    <input
                      type="number"
                      name="awayOddsDenominator"
                      id=""
                      className="form-control"
                      value={awayOddsDenominator}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group pt-2">
            <div className="form-check form-check-inline col d-flex justify-content-center">
              <label htmlFor="Kick-Off" className="form-check-label">
                Kick Off Time:
              </label>
              <br />
              <input
                type="time"
                name="kick_off"
                id="Kick-Off"
                className="form-check-inline"
                value={kick_off}
                onChange={this.onChange}
              />
            </div>
          </div>
          <div className="form-group pt-4 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  addMatch,
};

export default connect(null, mapDispatchToProps)(Form);

const decimalOdds = (numerator, denominator) => {
  return numerator / denominator + 1;
};
