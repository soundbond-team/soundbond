import { CHANGE_ZOOM } from "../actions/postToMap.actions";
// Ce reducer sert a stocker tous les posts reçus (ainsi que les données des KF)
const initialState = [];

export default function postToMapReducer(state = initialState, action) {
  if (action.type === CHANGE_ZOOM) {
    return action.payload;
  } else {
    return state;
  }
}
