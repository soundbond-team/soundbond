

export const CHANGE_ZOOM = "CHANGE_ZOOM";

// Récupérer tous les SoundLocation
export const change_ZOOM = (zoom_list) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_ZOOM, payload: zoom_list });
  };
};
