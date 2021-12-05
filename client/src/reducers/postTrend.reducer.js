import {
  GET_ALL_POST_TREND,
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADD_SHARE,
  REMOVE_SHARE,
} from "../actions/post.actions";
import {
  add_like,
  remove_like,
  add_comment,
  remove_comment,
  add_share,
  remove_share,
} from "./functions/function";
// Ce reducer sert a stocker tous les posts reçus (ainsi que les données des FK)
const initialState = [];

export default function postTrendReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POST_TREND:
      return action.payload;

    case ADD_LIKE:
      return add_like(state, action.payload);
    case REMOVE_LIKE:
      return remove_like(state, action.payload);

    case ADD_COMMENT:
      return add_comment(state, action.payload);

    case REMOVE_COMMENT:
      return remove_comment(state, action.payload);

    case ADD_SHARE:
      return add_share(state, action.payload);
    case REMOVE_SHARE:
      return remove_share(state, action.payload);
    default:
      return state;
  }
}
