import { GET_POST_BY_TAG } from "../actions/search.actions";
//ce reducer garde tt les sound lcoations recu
const initialState = [];

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_BY_TAG:
      return action.payload;

    case ADD_LIKE:
      return state.map((posts) => {
        if (posts.id === action.payload.id) {
          return {
            ...posts,
            liked_by: [action.payload.user_data, ...posts.liked_by],
          };
        }
        return posts;
      });

    case REMOVE_LIKE:
      return state.map((posts) => {
        if (posts.id === action.payload.id) {
          return {
            ...posts,
            liked_by: posts.liked_by.filter(
              (user_data) => user_data.id !== action.payload.user_data.id
            ),
          };
        }
        return posts;
      });

    default:
      return state;
  }
}
