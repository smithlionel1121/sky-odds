import { GET_DATA } from "../actions/types";

const initialState = {
  homeScore: null,
  awayScore: null,
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
      title: "Odds",
      rangemode: "nonnegative",
      autorange: true,
    },
  },
  revision: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      const revision = state.revision + 1;
      const dataRevision = revision + 1;
      if (action.payload.minutes) {
        return {
          ...state,
          homeScore: action.payload.home_score,
          awayScore: action.payload.away_score,
          homeOdds: {
            ...state.homeOdds,
            x: [...state.homeOdds.x, action.payload.minutes],
            y: [...state.homeOdds.y, action.payload.home_odds],
          },
          drawOdds: {
            ...state.drawOdds,
            x: [...state.drawOdds.x, action.payload.minutes],
            y: [...state.drawOdds.y, action.payload.draw_odds],
          },
          awayOdds: {
            ...state.awayOdds,
            x: [...state.awayOdds.x, action.payload.minutes],
            y: [...state.awayOdds.y, action.payload.away_odds],
          },
          layout: {
            ...state.layout,
            datarevision: dataRevision,
          },
          revision: revision,
        };
      }
      return state;
    default:
      return state;
  }
};
