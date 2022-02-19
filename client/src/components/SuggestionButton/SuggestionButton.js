import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow } from "../../actions/user.actions";
function SuggestionButton(props) {
  const dispatch = useDispatch();
  const currentUserdata = useSelector((state) => state.userReducer);
  const [suivi, setSuivi] = useState(false);
  async function suivre() {
    setSuivi(true);

    await dispatch(follow(currentUserdata.id, props.user.id));
  }
  async function neplussuivre() {
    setSuivi(false);

    await dispatch(unfollow(currentUserdata.id, props.user.id));
  }
  return (
    <>
      <div className="row">
        <div className="card">
          <div className="d-flex ">
            {" "}
            <div className="p-2 bd-highlight">{props.user.username}</div>
            <div className="ms-auto p-2 bd-highlight">
              {" "}
              {!suivi ? (
                <button type="button" className="btn btn-dark" onClick={suivre}>
                  Suivre
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={neplussuivre}
                >
                  Ne plus suivre
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuggestionButton;
