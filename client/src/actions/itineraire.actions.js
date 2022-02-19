

export const CHANGE_ITINERAIRE = "CHANGE_ITINERAIRE";

// Récupérer tous les SoundLocation
export const change_itineraire = (itineraire_list) => {
  return (dispatch) => {
    dispatch({ type: CHANGE_ITINERAIRE, payload: itineraire_list });
  };
};
