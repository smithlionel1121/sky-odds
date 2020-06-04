import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Plot from "react-plotly.js";

import Card from "./Card";

class Chart extends Component {
  static propTypes = {
    chart: PropTypes.object,
    match: PropTypes.object,
  };

  render() {
    this.props.chart.homeOdds.name = `${this.props.match.home_team} Win`;
    this.props.chart.awayOdds.name = `${this.props.match.away_team} Win`;
    return (
      <Fragment>
        <Row>
          <Col>
            <Card />
          </Col>
        </Row>
        <Row>
          <Col>
            <Plot
              style={{ maxWidth: "100%", margin: "auto" }}
              data={[
                this.props.chart.homeOdds,
                this.props.chart.drawOdds,
                this.props.chart.awayOdds,
              ]}
              layout={this.props.chart.layout}
              revision={this.props.chart.revision}
              config={{ responsive: true }}
              debug={true}
            />
          </Col>
        </Row>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  match: state.matchReducer,
  chart: state.chartReducer,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
