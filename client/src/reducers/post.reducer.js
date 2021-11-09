import { GET_ALL_POST, ADD_LIKE, REMOVE_LIKE, ADD_COMMENT, REMOVE_COMMENT } from "../actions/post.actions";
// Ce reducer sert a stocker tous les posts reçus (ainsi que les données des FK)
const initialState = [];

export default function postReducer(state = initialState, action) {
  switch (action.type) {

    case GET_ALL_POST:
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

      case ADD_COMMENT:
        return state.map((posts) => {
          if (posts.id === action.payload.id) {
            return {
              ...posts,
              commented_by: [action.payload.user_data, ...posts.commented_by],
            };
          }
          return posts;
        });
        
      case REMOVE_COMMENT:
        return state.map((posts) => {
          if (posts.id === action.payload.id) {
            return {
              ...posts,
              commented_by: posts.commented_by.filter(
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
