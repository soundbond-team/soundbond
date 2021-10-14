import { combineReducers } from "redux";
import soundlocationReducer from "./soundlocation.reducer";
import soundReducer from "./sound.reducer";
import postReducer from "./posts.reducer";
import onesoundlocationReducer from "./onesoundlocation.reducer";
export default combineReducers({
  soundlocationReducer,
  soundReducer,
  postReducer,
  onesoundlocationReducer,
});
