import React, { useState } from "react";
import Routes from "./components/Routes/Routes";
import { UidContext } from "./components/Appcontext";
import { useDispatch } from "react-redux";

const App = () => {
  const [uid, setUid] = useState(1); // eslint-disable-next-line
  const dispatch = useDispatch(); // eslint-disable-next-line

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
