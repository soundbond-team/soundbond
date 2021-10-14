import { POST_SOUND } from "../actions/sound.actions";

const intialState = [];

export default function soundReducer(state = intialState, action) {
  switch (action.type) {
    case POST_SOUND:
      return action.payload;

    default:
      return state;
  }
}
