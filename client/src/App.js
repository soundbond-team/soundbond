import React, { useEffect, useState } from "react";
import Routes from "./components/Routes/Routes";
import { UidContext } from "./components/Appcontext";
import { useDispatch } from "react-redux";
import { getallPost } from "./actions/post.actions";
const App = () => {
  const [uid] = useState(1); // eslint-disable-next-line
  const dispatch = useDispatch(); // eslint-disable-next-line
  useEffect(() => {
    dispatch(getallPost);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <UidContext.Provider value={uid}>
      <button id="sel-button">Cliquez-moi !</button>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
