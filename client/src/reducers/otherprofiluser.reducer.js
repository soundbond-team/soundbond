import { GET_OTHER_PROFIL_USER } from "../actions/user.actions";

const initialState = {};

export default function getotherprofiluser(state = initialState, action) {
  switch (action.type) {
    case GET_OTHER_PROFIL_USER:
      return action.payload;
    default:
      return state;
  }
}
