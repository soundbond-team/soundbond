import React, { useEffect } from "react";
import Playlist from "../../components/MyPlayLists/MyPlaylists";
import { useDispatch, useSelector } from "react-redux";
import { getPostVisitedByUser } from "../../actions/post.actions";

function HistoriqueEcoute(){
   
  const currentUserdata = useSelector((state) => state.getotherprofiluser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserdata) {
      dispatch(getPostVisitedByUser(currentUserdata.id));
    } // eslint-disable-next-line
  }, [currentUserdata]);

  return (
    <>
      <Playlist />
    </>
  );
}

export default HistoriqueEcoute;