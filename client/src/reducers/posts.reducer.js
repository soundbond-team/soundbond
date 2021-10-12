import { GET_ALL_POST } from "../actions/post.actions";

const intialState = [];

export default function postReducer(state = intialState, action) {
  switch (action.type) {
    case GET_ALL_POST:
      return action.payload;

    default:
      return state;
  }
}
