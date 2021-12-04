import { CHANGE_ZOOM } from "../actions/post2Map.actions";
// Ce reducer sert a stocker tous les posts reçus (ainsi que les données des KF)
const initialState = [];

export default function postToMapReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ZOOM:
      return action.payload;

    default:
      return state;
  }
}
