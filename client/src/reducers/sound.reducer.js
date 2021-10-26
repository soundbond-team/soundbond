import { POST_SOUND } from "../actions/sound.actions";
// Ce reducer sert a stocker le dernier son posté.
const initialState = [];

export default function soundReducer(state = initialState, action) {
  switch (action.type) {
    case POST_SOUND:
      return action.payload;

    default:
      return state;
  }
}
