export const add_like = (state, payload) => {
  return state.map((posts) => {
    if (posts.id === payload.id) {
      return {
        ...posts,
        liked_by: [payload.user_data, ...posts.liked_by],
      };
    }
    return posts;
  });
};

export const remove_like = (state, payload) => {
  return state.map((posts) => {
    if (posts.id === payload.id) {
      return {
        ...posts,
        liked_by: posts.liked_by.filter(
          (user_data) => user_data.id !== payload.user_data.id
        ),
      };
    }
    return posts;
  });
};
export const add_commentaire = (state, payload) => {
  console.log(payload);
  const datacomment = {
    comment: payload.data.comment,
    id: payload.data.id,
    post_id: payload.data.post_id,

    commented_by_user: {
      id: payload.userData.id,
      username: payload.userData.username,
    },
  };

  return state.map((posts) => {
    if (posts.id === payload.post_id) {
      return {
        ...posts,
        comments_on_post: [datacomment, ...posts.comments_on_post],
      };
    }
    return posts;
  });
};

export const remove_comment = (state, payload) => {
  return state.map((posts) => {
    if (posts.id === payload.post_id) {
      return {
        ...posts,
        comments_on_post: posts.comments_on_post.filter(
          (data) => data.id !== payload.comment_id
        ),
      };
    }
    return posts;
  });
};

export const add_share = (state, payload) => {
  return state.map((posts) => {
    if (posts.id === payload.post_id) {
      return {
        ...posts,
        shared_by: [payload.userData, ...posts.shared_by],
      };
    }
    return posts;
  });
};
export const remove_share = (state, payload) => {
  return state.map((posts) => {
    if (posts.id === payload.id) {
      return {
        ...posts,
        shared_by: posts.shared_by.filter(
          (data) => payload.userData.id !== data.id
        ),
      };
    }
    return posts;
  });
};

export const remove_post = (state, payload) => {
  return state.filter((post) => post.id !== payload.postId);
};

export const update_post = (state, payload) => {
  return state.map((posts) => {
    if (posts.id === payload.post_id) {
      return {
        ...posts,
        updated_by: posts.updated_by.filter(
          (data) => data.id !== payload.userData.id
        ),
      };
    }
    return posts;
  });
};

export const add_save = (state, payload) => {
  return state.map((posts) => {
    if (posts.id === payload.post_id) {
      return {
        ...posts,
        saved_by: [payload.userData, ...posts.saved_by],
      };
    }
    return posts;
  });
};
export const remove_save = (state, payload) => {
  return state.map((posts) => {
    if (posts.id === payload.id) {
      return {
        ...posts,
        saved_by: posts.saved_by.filter(
          (data) => payload.userData.id !== data.id
        ),
      };
    }
    return posts;
  });
};
