import { POST_SOUNDLOCATION } from "../actions/soundlocation.actions";
//Ce reducer sert a stocké la position du dernier son posté
const intialState = [];

export default function onesoundlocationReducer(state = intialState, action) {
  switch (action.type) {
    case POST_SOUNDLOCATION:
      return action.payload;

    default:
      return state;
  }
}
