import {
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADD_SHARE,
  GET_HISTORY,
  REMOVE_SHARE,
  REMOVE_POST,
  UPDATE_POST,
  ADD_SAVE,
  REMOVE_SAVE,
  LOAD_MORE_POSTS,
} from "../actions/post.actions";
// Ce reducer sert a stocker tous les posts reçus (ainsi que les données des KF)
import {
  add_like,
  remove_like,
  add_commentaire,
  remove_comment,
  add_share,
  remove_share,
  remove_post,
  update_post,
  add_save,
  remove_save,
  load_more_posts,
} from "./functions/function";

const initialState = [];

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HISTORY:
      return action.payload;

    case ADD_LIKE:
      return add_like(state, action.payload);
    case REMOVE_LIKE:
      return remove_like(state, action.payload);

    case ADD_COMMENT:
      return add_commentaire(state, action.payload);

    case REMOVE_COMMENT:
      return remove_comment(state, action.payload);

    case ADD_SHARE:
      return add_share(state, action.payload);
    case REMOVE_SHARE:
      return remove_share(state, action.payload);
    case REMOVE_POST:
      return remove_post(state, action.payload);
    case UPDATE_POST:
      return update_post(state, action.payload);
    case ADD_SAVE:
      return add_save(state, action.payload);
    case REMOVE_SAVE:
      return remove_save(state, action.payload);
    case LOAD_MORE_POSTS:
      return load_more_posts(state, action.payload);
    default:
      return state;
  }
}
