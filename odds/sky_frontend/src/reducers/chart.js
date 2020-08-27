import { GET_DATA } from "../actions/types";

const initialState = {
  homeScore: null,
  awayScore: null,
  homeGoals: "",
  awayGoals: "",
  homeOdds: {
    x: [],
    y: [],
    name: "Home Win",
  },
  drawOdds: {
    x: [],
    y: [],
    name: "Draw",
  },
  awayOdds: {
    x: [],
    y: [],
    name: "Away Win",
  },
  // homeHedge: {
  //   x: [],
  //   y: [],
  //   z: [],
  //   name: "Home",
  // },
  // drawHedge: {
  //   x: [],
  //   y: [],
  //   z: [],
  //   name: "Draw",
  // },
  // awayHedge: {
  //   x: [],
  //   y: [],
  //   z: [],
  //   name: "Away",
  // },
  layout: {
    datarevision: 0,
    title: "Match Odds",
    autosize: true,
    xaxis: {
      title: "Minutes",
      rangemode: "tozero",
      autorange: true,
    },
    yaxis: {
      title: "Probability (%)",
      range: [0, 100],
    },
    showlegend: true,
    legend: {
      x: 0,
      y: 1.25,
      orientation: "v",
      xanchor: "left",
    },
  },
  // hedgeLayout: {
  //   datarevision: 0,
  //   title: "Hedging",
  //   autosize: true,
  //   xaxis: {
  //     title: "Minutes",
  //     rangemode: "tozero",
  //     autorange: true,
  //   },
  //   yaxis: {
  //     title: "Stake Ratio",
  //     rangemode: "tozero",
  //     autorange: true,
  //   },
  //   zaxis: {
  //     title: "Profit",
  //     autorange: true,
  //   },
  // showlegend: true,
  // legend: {
  //   x: 0,
  //   y: 1.25,
  //   y: 1.25,
  //   orientation: "v",
  //   xanchor: "left",
  // },
  // },
  revision: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      const revision = state.revision + 1;
      const dataRevision = revision + 1;
      const normalizedPropability = decimalToNormalizedProbaility(
        action.payload.home_odds,
        action.payload.draw_odds,
        action.payload.away_odds
      );
      if (action.payload.minutes) {
        return {
          ...state,
          homeScore: action.payload.home_score,
          awayScore: action.payload.away_score,
          homeGoals: action.payload.home_goals,
          awayGoals: action.payload.away_goals,
          homeOdds: {
            ...state.homeOdds,
            x: [...state.homeOdds.x, action.payload.minutes],
            y: [...state.homeOdds.y, normalizedPropability.homeProbability],
          },
          drawOdds: {
            ...state.drawOdds,
            x: [...state.drawOdds.x, action.payload.minutes],
            y: [...state.drawOdds.y, normalizedPropability.drawProbability],
          },
          awayOdds: {
            ...state.awayOdds,
            x: [...state.awayOdds.x, action.payload.minutes],
            y: [...state.awayOdds.y, normalizedPropability.awayProbability],
          },
          // homeHedge: {
          //   ...state.homeHedge,
          //   x: [...state.homeHedge.x, action.payload.minutes],
          //   y: [...state.homeHedge.y, action.payload.home_hedged_ratio],
          //   z: [...state.homeHedge.z, action.payload.home_hedged_profit],
          // },
          // drawHedge: {
          //   ...state.drawHedge,
          //   x: [...state.drawHedge.x, action.payload.minutes],
          //   y: [...state.drawHedge.y, action.payload.draw_hedged_ratio],
          //   z: [...state.drawHedge.z, action.payload.draw_hedged_profit],
          // },
          // awayHedge: {
          //   ...state.awayHedge,
          //   x: [...state.awayHedge.x, action.payload.minutes],
          //   y: [...state.awayHedge.y, action.payload.away_hedged_ratio],
          //   z: [...state.awayHedge.z, action.payload.away_hedged_profit],
          // },
          layout: {
            ...state.layout,
            datarevision: dataRevision,
          },
          // hedgeLayout: {
          //   ...state.hedgeLayout,
          //   datarevision: dataRevision,
          // },
          revision: revision,
        };
      }
      return state;
    default:
      return state;
  }
};
const decimalToNormalizedProbaility = (homeOdds, drawOdds, awayOdds) => {
  const impliedPropabilityHomeOdds = 1 / homeOdds;
  const impliedPropabilityDrawOdds = 1 / drawOdds;
  const impliedPropabilityAwayOdds = 1 / awayOdds;
  const cumulativeProbability =
    impliedPropabilityHomeOdds +
    impliedPropabilityDrawOdds +
    impliedPropabilityAwayOdds;
  const homeProbability =
    (impliedPropabilityHomeOdds / cumulativeProbability) * 100;
  const drawProbability =
    (impliedPropabilityDrawOdds / cumulativeProbability) * 100;
  const awayProbability =
    (impliedPropabilityAwayOdds / cumulativeProbability) * 100;

  const normalizedPropability = {
    homeProbability,
    drawProbability,
    awayProbability,
  };

  return normalizedPropability;
};
