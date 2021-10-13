import { GET_ALL_POST } from "../actions/post.actions";
//ce reducer sert a stocké tt les posts recu (ainsi que les données des FK)
const intialState = [];

export default function postReducer(state = intialState, action) {
  switch (action.type) {
    case GET_ALL_POST:
      return action.payload;

    default:
      return state;
  }
}
