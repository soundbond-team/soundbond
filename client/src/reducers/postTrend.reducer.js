import {
  GET_ALL_POST_TREND,
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADD_SHARE,
  GET_ALL_POSTS_SHARED_BY_USER,
  REMOVE_SHARE,
} from "../actions/post.actions";
// Ce reducer sert a stocker tous les posts reçus (ainsi que les données des FK)
const initialState = [];

export default function postTrendReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POST_TREND:
      return action.payload;
    case GET_ALL_POSTS_SHARED_BY_USER:
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
      const datacomment = {
        id: action.payload.userData.id,
        username: action.payload.userData.username,
        comment: action.payload.data,
      };

      return state.map((posts) => {
        if (posts.id === action.payload.post_id) {
          return {
            ...posts,
            commented_by: [datacomment, ...posts.commented_by],
          };
        }
        return posts;
      });

    case REMOVE_COMMENT:
      return state.map((posts) => {
        if (posts.id === action.payload.post_id) {
          return {
            ...posts,
            commented_by: posts.commented_by.filter(
              (data) => data.id !== action.payload.userData.id
            ),
          };
        }
        return posts;
      });

    case ADD_SHARE:
      return state.map((posts) => {
        if (posts.id === action.payload.post_id) {
          return {
            ...posts,
            shared_by: [action.payload.userData, ...posts.shared_by],
          };
        }
        return posts;
      });
    case REMOVE_SHARE:
      return state.map((posts) => {
        if (posts.id === action.payload.id) {
          return {
            ...posts,
            shared_by: posts.shared_by.filter(
              (data) => action.payload.userData.id !== data.id
            ),
          };
        }
        return posts;
      });
    default:
      return state;
  }
}
