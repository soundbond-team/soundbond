import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Routes from "./components/Routes/Routes";
import { UidContext } from "./components/Appcontext";
import { getPostTrend, getallPost, getallComments } from "./actions/post.actions";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState(null); // eslint-disable-next-line
  const dispatch = useDispatch(); // eslint-disable-next-line

  useEffect(() => {
    const token = async () => {
      await axios({
        method: "get",
        url: `http://localhost:8080/jwtid`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data.id);
        })
        .catch((err) => {
          console.log("No tokens");
        });
    };
    token();
    dispatch(getallPost());
    if (uid) {
      dispatch(getUser(uid));
      dispatch(getPostTrend(uid));
    }
    dispatch(getallComments(uid));

  }, [uid]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
