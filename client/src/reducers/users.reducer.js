import { GET_ALL_USER,FOLLOW_USER} from "../actions/users.actions";


const initialState = {};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USER:
      return action.payload;
      case FOLLOW_USER:
        return {
          ...state,
          follows: action.payload,
          loading: false
        };
    default:
      return state;
  }
}
