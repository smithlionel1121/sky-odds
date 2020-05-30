import { GET_DATA } from "../actions/types";

const initialState = {
  homeOdds: {
    x: [],
    y: [],
    name: "Home Odds",
  },
  layout: {
    datarevision: 0,
  },
  revision: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      const revision = state.revision + 1;
      const dataRevision = revision + 1;
      return {
        ...state,
        homeOdds: {
          x: [...state.homeOdds.x, action.payload.minutes],
          y: [...state.homeOdds.y, action.payload.home_odds],
          name: "Home Odds",
        },
        layout: {
          datarevision: dataRevision,
        },
        revision: revision,
      };
    default:
      return state;
  }
};
