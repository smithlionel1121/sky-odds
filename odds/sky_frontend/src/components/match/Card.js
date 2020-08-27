import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { getData } from "../../actions/chart";

class MatchCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scraping: false,
    };
  }

  static propTypes = {
    getData: PropTypes.func.isRequired,
  };

  startScrape = () => {
    const url = this.props.match.url;
    this.intervalID = setInterval(() => this.props.getData(url), 60000);
    this.setState({
      scraping: true,
    });
  };

  stopScrape = () => {
    clearInterval(this.intervalID);
    this.setState({
      scraping: false,
    });
  };

  render() {
    const start = (
      <Button variant="primary" onClick={this.startScrape}>
        Start
      </Button>
    );
    const stop = (
      <Button variant="primary" onClick={this.stopScrape}>
        Stop
      </Button>
    );
    return (
      <Fragment>
        <Card className="d-block d-md-none text-center">
          <Card.Header>Live Match</Card.Header>
          <Card.Body as={Container}>
            <Row>
              <Col>
                <Row>
                  <Card.Title
                    as={Col}
                    className="h5 text-left"
                    xs={{ order: 1 }}
                  >
                    {this.props.match.home_team}
                  </Card.Title>
                  <Card.Title
                    as={Col}
                    className="h5 text-right"
                    xs={{ order: 2 }}
                  >
                    {this.props.chart.homeScore}
                  </Card.Title>
                </Row>
                <Row>
                  <Card.Text as={Col} className="text-left">
                    {this.props.chart.homeGoals}
                  </Card.Text>
                </Row>

                <Row className="pt-2">
                  <Card.Title
                    as={Col}
                    className="h5 text-left"
                    xs={{ order: 1 }}
                  >
                    {this.props.match.away_team}
                  </Card.Title>
                  <Card.Title
                    as={Col}
                    className="h5 text-right"
                    xs={{ order: 2 }}
                  >
                    {this.props.chart.awayScore}
                  </Card.Title>
                </Row>
                <Row>
                  <Card.Text as={Col} className="text-left">
                    {this.props.chart.awayGoals}
                  </Card.Text>
                </Row>
                {this.state.scraping ? stop : start}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="d-none d-md-block text-center">
          <Card.Header>Live Match</Card.Header>
          <Card.Body as={Container}>
            <Row>
              {/* <Card.Title as={Col} className="h5 text-center" xs={{ order: 1 }}>
                {this.props.match.home_team}
              </Card.Title>
              <Card.Title as={Col} className="h5 text-center" xs={{ order: 2 }}>
                {this.props.chart.homeScore} v {this.props.chart.awayScore}
              </Card.Title>
              <Card.Title as={Col} className="h5 text-center" xs={{ order: 3 }}>
                {this.props.match.away_team}
              </Card.Title> */}

              <Card.Title as={Col} className="h5" xs={{ order: 1 }} sm={4}>
                {this.props.match.home_team}
              </Card.Title>
              <Card.Title as={Col} className="h5" xs={{ order: 2 }} sm={1}>
                {this.props.chart.homeScore}
              </Card.Title>
              <Card.Title as={Col} className="h5" xs={{ order: 3 }} sm={2}>
                v
              </Card.Title>
              <Card.Title as={Col} className="h5" xs={{ order: 4 }} md={1}>
                {this.props.chart.awayScore}
              </Card.Title>
              <Card.Title as={Col} className="h5" xs={{ order: 5 }} md={4}>
                {this.props.match.away_team}
              </Card.Title>
            </Row>
            <Row>
              <Card.Text as={Col} className="text-right" xs={{ order: 1 }}>
                {this.props.chart.homeGoals}
              </Card.Text>
              <Card.Text as={Col} className="text-left" xs={{ order: 2 }}>
                {this.props.chart.awayGoals}
              </Card.Text>
            </Row>
            {this.state.scraping ? stop : start}
          </Card.Body>
          <Card.Footer className="text-muted">Use Responsibly</Card.Footer>
        </Card>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  match: state.matchReducer,
  chart: state.chartReducer,
});

const mapDispatchToProps = {
  getData,
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchCard);
