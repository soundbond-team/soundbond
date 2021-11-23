import { GET_POST_BY_TAG } from "../actions/search.actions";
//ce reducer garde tt les sound lcoations recu
const initialState = [];

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_BY_TAG:
      return action.payload;

    default:
      return state;
  }
}
