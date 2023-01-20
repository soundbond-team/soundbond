import { combineReducers } from "redux";

import soundlocationReducer from "./soundlocation.reducer";
import soundReducer from "./sound.reducer";
import postReducer from "./post.reducer";
import onesoundlocationReducer from "./onesoundlocation.reducer";
import userReducer from "./user.reducer";
import getotherprofiluser from "./otherprofiluser.reducer";
import postTrendReducer from "./postTrend.reducer";
import profilPostReducer from "./profilPostReducer";
import postSearcByTagReducer from "./postSearcByTag.reducer";

import allpostsharedReducer from "./allpostSharedbyuser";
import allplaylistByUser from "./allplaylistByUser";
import itinerairereducer from "./itineraire.reducer";
import postToMapReducer from "./postToMap.reducer";
import allpostsavedReducer from "./allpostsaved.reducer";
import historyReducer from "./history.reducer";
import allpostmapReducer from "./allpostonmap.reducer";
export default combineReducers({
  soundlocationReducer,
  soundReducer,
  postReducer,
  onesoundlocationReducer,
  userReducer,
  postTrendReducer,
  profilPostReducer,
  postSearcByTagReducer,
  allpostsharedReducer,
  allpostsavedReducer,
  allplaylistByUser,
  itinerairereducer,
  postToMapReducer,
  getotherprofiluser,
  historyReducer,
  allpostmapReducer,
});
