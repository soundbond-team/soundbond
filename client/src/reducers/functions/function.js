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
  const datacomment = {
    id: payload.userData.id,
    username: payload.userData.username,
    comment: payload.data,
  };

  return state.map((posts) => {
    if (posts.id === payload.post_id) {
      return {
        ...posts,
        commented_by: [datacomment, ...posts.commented_by],
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
        commented_by: posts.commented_by.filter(
          (data) => data.id !== payload.userData.id
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
