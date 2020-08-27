import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addMatch } from "../../actions/match";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const baseUrl = "https://m.skybet.com/football/football-live/event/";
const home_team = "Home";
const away_team = "Away";

class EventForm extends Component {
  state = {
    eventUrl: "",
    homeOddsNumerator: "",
    homeOddsDenominator: "",
    drawOddsNumerator: "",
    drawOddsDenominator: "",
    awayOddsNumerator: "",
    awayOddsDenominator: "",
    kick_off: "00:00",
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
    // console.log(match);
    this.props.addMatch(match);

    this.setState({
      eventUrl: "",
      homeOddsNumerator: "",
      homeOddsDenominator: "",
      drawOddsNumerator: "",
      drawOddsDenominator: "",
      awayOddsNumerator: "",
      awayOddsDenominator: "",
      kick_off: "00:00",
    });
    this.props.history.push("/data");
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
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="skyEventUrlNumber">
            <Form.Label>Sky Event URL:</Form.Label>
            <Form.Control
              placeholder="e.g. 123456789"
              name={"eventUrl"}
              value={eventUrl}
              onChange={this.onChange}
            />
          </Form.Group>

          <Form.Row>
            <Accordion as={Col} sm={4} className="pt-2">
              <Accordion.Toggle
                as={Form.Check}
                label="H Odds"
                type="checkbox"
                eventKey="homeOddsInput"
                className="text-center"
              />
              <Accordion.Collapse eventKey="homeOddsInput">
                <InputGroup>
                  <Form.Control
                    name={"homeOddsNumerator"}
                    value={homeOddsNumerator}
                    onChange={this.onChange}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>/</InputGroup.Text>
                  </InputGroup.Append>
                  <Form.Control
                    name={"homeOddsDenominator"}
                    value={homeOddsDenominator}
                    onChange={this.onChange}
                  />
                </InputGroup>
              </Accordion.Collapse>
            </Accordion>

            <Accordion as={Col} sm={4} className="pt-2">
              <Accordion.Toggle
                as={Form.Check}
                label="D Odds"
                type="checkbox"
                eventKey="drawOddsInput"
                className="text-center"
              />
              <Accordion.Collapse eventKey="drawOddsInput">
                <InputGroup>
                  <Form.Control
                    name={"drawOddsNumerator"}
                    value={drawOddsNumerator}
                    onChange={this.onChange}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>/</InputGroup.Text>
                  </InputGroup.Append>
                  <Form.Control
                    name={"drawOddsDenominator"}
                    value={drawOddsDenominator}
                    onChange={this.onChange}
                  />
                </InputGroup>
              </Accordion.Collapse>
            </Accordion>

            <Accordion as={Col} sm={4} className="pt-2">
              <Accordion.Toggle
                as={Form.Check}
                className="text-center"
                label="A Odds"
                type="checkbox"
                eventKey="awayOddsInput"
              />
              <Accordion.Collapse eventKey="awayOddsInput">
                <InputGroup>
                  <Form.Control
                    name={"awayOddsNumerator"}
                    value={awayOddsNumerator}
                    onChange={this.onChange}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text>/</InputGroup.Text>
                  </InputGroup.Append>
                  <Form.Control
                    name={"awayOddsDenominator"}
                    value={awayOddsDenominator}
                    onChange={this.onChange}
                  />
                </InputGroup>
              </Accordion.Collapse>
            </Accordion>
          </Form.Row>

          <Form.Row className="d-flex justify-content-center pt-4">
            <Form.Group controlId="kickOffTime">
              <Form.Label>Kick Off:</Form.Label>
              <Form.Control
                as="input"
                type="time"
                name={"kick_off"}
                value={kick_off}
                onChange={this.onChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group
            controlId="submitButton"
            className="d-flex justify-content-center pt-4"
          >
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  addMatch,
};

export default connect(null, mapDispatchToProps)(EventForm);

const decimalOdds = (numerator, denominator) => {
  return numerator / denominator + 1;
};
