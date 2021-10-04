import { GET_SOUNDLOCATION } from "../actions/soundlocation.actions";

const intialState = [];

export default function soundlocationReducer(state = intialState, action) {
  switch (action.type) {
    case GET_SOUNDLOCATION:
      return action.payload;

    default:
      return state;
  }
}
