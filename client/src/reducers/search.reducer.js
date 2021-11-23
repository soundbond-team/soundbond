import {
  GET_POST_BY_TAG,
  ADD_COMMENT,
  ADD_LIKE,
  REMOVE_COMMENT,
  REMOVE_LIKE,
} from "../actions/search.actions";

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

    case ADD_COMMENT:
      const datacomment = {
        id: action.payload.userData.id,
        username: action.payload.userData.username,
        comment: action.payload.data,
      };
      console.log(datacomment);
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
          console.log(posts.commented_by);
          return {
            ...posts,
            commented_by: posts.commented_by.filter(
              (data) => data.id !== action.payload.userData.id
            ),
          };
        }
        return posts;
      });

    default:
      return state;
  }
}
