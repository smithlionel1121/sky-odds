import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
      <Card className="text-center">
        <Card.Header>Live Match</Card.Header>
        <Card.Body>
          <Card.Title>
            {this.props.chart.homeScore} {this.props.match.home_team} v{" "}
            {this.props.match.away_team} {this.props.chart.awayScore}
          </Card.Title>
          <Card.Text>(Goal Scorers here)</Card.Text>
          {this.state.scraping ? stop : start}
        </Card.Body>
        <Card.Footer className="text-muted">Use Responsibly</Card.Footer>
      </Card>
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
