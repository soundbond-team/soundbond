import { GET_MOST_LISTENED } from "../actions/insights.actions";

const initialState = {
  getMostListenedResponse:null,
};

export default function insightsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MOST_LISTENED:
      return action.payload;
    default:
      return state;
  }
}
