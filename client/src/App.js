import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Routes from "./components/Routes/Routes";
import { UidContext } from "./components/Appcontext";
import {
  getPostTrend,
  getallPost,
  getAllPostSavedByUser,
} from "./actions/post.actions";
import { getUser } from "./actions/user.actions";

const backServerURL = process.env.REACT_APP_BACK_SERVER_URL;
const trackingServerURL = process.env.REACT_APP_TRACKING_SERVER_URL;

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = async () => {
      await axios({
        method: "get",
        url: backServerURL + `jwtid`,
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
      dispatch(getAllPostSavedByUser(uid));
    } // eslint-disable-next-line

    var _paq = (window._paq = window._paq || []);
    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);
    (function () {
      _paq.push(["setTrackerUrl", trackingServerURL + "matomo.php"]);
      _paq.push(["setSiteId", "1"]);
      var d = document,
        g = d.createElement("script"),
        s = d.getElementsByTagName("script")[0];
      g.async = true;
      g.src = trackingServerURL + "matomo.js";
      s.parentNode.insertBefore(g, s);
    })();
    //eslint-disable-next-line
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
