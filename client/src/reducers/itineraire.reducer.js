import { CHANGE_ITINERAIRE } from "../actions/itineraire.actions";
// Ce reducer sert a stocker tous les posts reçus (ainsi que les données des KF)
const initialState = [];

export default function itinerairereducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ITINERAIRE:
      return action.payload;

    default:
      return state;
  }
}
