import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Plot from "react-plotly.js";

import { getData } from "../../actions/chart";

class Chart extends Component {
  static propTypes = {
    getData: PropTypes.func.isRequired,
    chart: PropTypes.object,
    match: PropTypes.object,
  };

  componentDidMount = () => {
    const url = this.props.match.url;
    setInterval(() => this.props.getData(url), 30000);
  };

  render() {
    return (
      <Fragment>
        <div className="container">
          <h2>Data Plot</h2>
          <Plot
            data={[this.props.chart.homeOdds]}
            layout={this.props.chart.layout}
            revision={this.props.chart.revision}
            config={{ responsive: true }}
            graphDiv="Graph"
          />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
