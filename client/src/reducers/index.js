import { combineReducers } from "redux";

import soundlocationReducer from "./soundlocation.reducer";
import soundReducer from "./sound.reducer";
import postReducer from "./post.reducer";
import onesoundlocationReducer from "./onesoundlocation.reducer";
import userReducer from "./user.reducer";
import postTrendReducer from "./postTrend.reducer";
import profilPostReducer from "./profilPostReducer";
import postSearcByTagReducer from "./postSearcByTag.reducer";
import searchReducer from "./search.reducer"; //pour les tags
import allpostsharedReducer from "./allpostSharedbyuser";
import allplaylistByUser from "./allplaylistByUser";
export default combineReducers({
  soundlocationReducer,
  soundReducer,
  postReducer,
  onesoundlocationReducer,
  userReducer,
  postTrendReducer,
  profilPostReducer,
  postSearcByTagReducer,
  searchReducer,
  allpostsharedReducer,
  allplaylistByUser,
});
