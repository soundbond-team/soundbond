import { GET_MOST_LISTENED } from "../actions/insights.actions";
import { GET_TOP_TREND } from "../actions/insights.actions";

const initialState = {
  getMostListenedResponse: null,
  getTopTrendResponse: null,
};

export default function insightsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOST_LISTENED:
      return {...state, getMostListenedResponse: action.payload};
    case GET_TOP_TREND:
      return {...state, getTopTrendResponse: action.payload};
    default:
      return state;
  }
}
