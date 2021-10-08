import React, { useEffect, useState } from "react";
import Routes from "./components/Routes/Routes";
import { UidContext } from "./components/Appcontext";
import { useDispatch } from "react-redux";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
