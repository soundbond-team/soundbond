import {
  GET_ALL_COMMENT_FOR_SPECIFIC_POST,
} from "../actions/post.actions";
// Ce reducer sert a stocker tous les posts reçus (ainsi que les données des FK)
const initialState = [];

export default function postTrendReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMMENT_FOR_SPECIFIC_POST:
      return action.payload;
    default:
      return state;
  }
}
