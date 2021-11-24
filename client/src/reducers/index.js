import { combineReducers } from "redux";

import soundlocationReducer from "./soundlocation.reducer";
import soundReducer from "./sound.reducer";
import postReducer from "./post.reducer";
import onesoundlocationReducer from "./onesoundlocation.reducer";
import userReducer from "./user.reducer";
import postTrendReducer from "./postTrend.reducer";
import profilPostReducer from "./profilPostReducer";
<<<<<<< HEAD
import postSearcByTagReducer from "./postSearcByTag.reducer";
=======
import searchReducer from "./search.reducer"; //pour les tags
import allpostsharedReducer from "./allpostSharedbyuser";
>>>>>>> 7665c55857eee774b2a62e2899f821af5ca815fa
export default combineReducers({
  soundlocationReducer,
  soundReducer,
  postReducer,
  onesoundlocationReducer,
  userReducer,
  postTrendReducer,
  profilPostReducer,
<<<<<<< HEAD
  postSearcByTagReducer,
=======
  searchReducer,
  allpostsharedReducer,
>>>>>>> 7665c55857eee774b2a62e2899f821af5ca815fa
});
