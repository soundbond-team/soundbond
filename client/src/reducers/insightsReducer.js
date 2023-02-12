import { GET_MOST_LISTENED, GET_NUMBER_FOLLOWER } from "../actions/insights.actions";
import { GET_TOP_TREND } from "../actions/insights.actions";
import { GET_NUMBER_POST } from "../actions/insights.actions";
import { GET_TIME_LISTENING } from "../actions/insights.actions";
import { GET_NUMBER_LIKES } from "../actions/insights.actions";

const initialState = {
  getMostListenedResponse: null,
  getTopTrendResponse: null,
  getNumberPostResponse: null,
  getTimeListeningResponse: null,
  getNumberLikesResponse: null,
};

export default function insightsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOST_LISTENED:
      return {...state, getMostListenedResponse: action.payload};
    case GET_TOP_TREND:
      return {...state, getTopTrendResponse: action.payload};
    case GET_NUMBER_POST:
      return {...state, getNumberPostResponse: action.payload};
    case GET_TIME_LISTENING:
      return {...state, getTimeListeningResponse: action.payload};
    case GET_NUMBER_FOLLOWER:
      return {...state, getNumberFolllowerResponse: action.payload};
    case GET_NUMBER_LIKES:
      return {...state, getNumberLikesResponse: action.payload};
    default:
      return state;
  }
}
