import { combineReducers } from "redux";

import soundlocationReducer from "./soundlocation.reducer";
import soundReducer from "./sound.reducer";
import postReducer from "./post.reducer";
import onesoundlocationReducer from "./onesoundlocation.reducer";
import userReducer from "./user.reducer";
import postTrendReducer from "./postTrend.reducer";
import profilPostReducer from "./profilPostReducer";
export default combineReducers({
  soundlocationReducer,
  soundReducer,
  postReducer,
  onesoundlocationReducer,
  userReducer,
  postTrendReducer,
  profilPostReducer,
});
