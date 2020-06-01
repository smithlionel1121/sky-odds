import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getData } from "../../actions/chart";

export class Card extends Component {
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
    this.intervalID = setInterval(() => this.props.getData(url), 5000);
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
      <button href="#" className="btn btn-primary" onClick={this.startScrape}>
        Start
      </button>
    );
    const stop = (
      <button href="#" className="btn btn-danger" onClick={this.stopScrape}>
        Stop
      </button>
    );
    return (
      <div className="card text-center">
        <div className="card-header">Live Match</div>
        <div className="card-body">
          <h5 className="card-title">
            {this.props.chart.homeScore} {this.props.match.home_team} v{" "}
            {this.props.match.away_team} {this.props.chart.awayScore}
          </h5>
          {this.state.scraping ? stop : start}
        </div>
        <div className="card-footer text-muted">Using Sky</div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Card);
