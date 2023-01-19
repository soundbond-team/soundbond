import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UidContext } from "../Appcontext";
import { most_listened_users } from "../../actions/insights.actions"

function Statistique() {
  const insights = useSelector((state) => state.insightsReducer);
  const dispatch = useDispatch();
  const uid = useContext(UidContext);

  useEffect(() => {
    console.log("reducer: ", insights); 
  }, []);

  useEffect(() => {
    console.log("UID: ", uid); 
    dispatch(most_listened_users(uid)) ;
    
  }, []);

  return (
    <>
    <div>
        Statistique
    </div>
    </>
  );
}

export default Statistique;
