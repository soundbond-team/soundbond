import { combineReducers } from "redux";
import soundlocationReducer from "./soundlocation.reducer";
import soundReducer from "./sound.reducer";

export default combineReducers({
  soundlocationReducer,
  soundReducer,
});
