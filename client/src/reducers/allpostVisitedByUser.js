
import { GET_HISTORY_BY_USER } from "../../actions/post.actions";
const initialState = [];

export default function allpostVisitedByUser(state = initialState, action) {
  switch (action.type) {
    case GET_HISTORY_BY_USER:
      return action.payload;
      default:
        return state;
    }
  }
  