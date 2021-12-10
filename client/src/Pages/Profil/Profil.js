import React, { useState, useEffect, useContext } from "react";

import axios from "axios";

import { UidContext } from "../../components/Appcontext";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  follow,
  unfollow,
  getotherprofiluser,
} from "../../actions/user.actions";
import { getPostTrend } from "../../actions/post.actions";
import IconButton from "@material-ui/core/IconButton";
import { useParams, Link, Outlet, useNavigate } from "react-router-dom";

const backServerURL = process.env.REACT_APP_BACK_SERVER_URL

// il faudra intégrer les requete aux actions et stocker les données dans les reducers (à l'étude)

function Profil(props) {
  const params = useParams();
  const navigate = useNavigate();

  const [currentUserdata, setcurrentUserdata] = useState();

  const [isFollow, setFollow] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const userData = useSelector((state) => state.userReducer);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  useEffect(() => {
    if (currentUserdata !== params.username) {
      const getcurrentUser = async (username) => {
        await axios({
          method: "get",
          url: backServerURL+`api/v1/user/username/${username}`,
        })
          .then((res) => {
            if (res.data !== "" && res.data != null) {
              pushUserdata(res.data);
            } else window.location = "/";
          })
          .catch((err) => {
            window.location = "/";
          });
      };
      dispatch(getotherprofiluser(params.username));
      getcurrentUser(params.username);
    } // eslint-disable-next-line
  }, [props, params]); //react-hooks/exhaustive-deps  eslint-disable-next-line
  useEffect(() => {
    navigate(`/profil/${params.username}/posts`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const pushUserdata = async (data) => {
    await setcurrentUserdata(data);
  };

  const followclick = async () => {
    setFollow(true);

    setcurrentUserdata((prevState) => {
      if (prevState != null) {
        return { ...prevState, following: [userData, ...prevState.following] };
      }
    });
    if (currentUserdata !== null) {
      await dispatch(follow(uid, currentUserdata.id));
    }

    dispatch(getPostTrend(uid));
  };
  const unfollowclick = async () => {
    setFollow(false);

    setcurrentUserdata((prevState) => ({
      ...prevState,
      following: currentUserdata.following.filter(
        (following) => following.id !== userData.id
      ),
    }));
    if (currentUserdata !== null) {
      await dispatch(unfollow(uid, currentUserdata.id));
    }
    dispatch(getPostTrend(uid));
  };

  useEffect(() => {
    if (currentUserdata) {
      for (let i = 0; i < currentUserdata.following.length; i++) {
        if (currentUserdata.following[i].id === uid) {
          setFollow(true);

          break;
        } else {
          setFollow(false);
        }
      }
    }
  }, [currentUserdata]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {currentUserdata ? (
        <>
          {" "}
          <div className="container">
            {" "}
            <div style={{ maxWidth: "550px", margin: "0px auto" }}>
              <div
                style={{
                  margin: "18px 0px",
                  borderBottom: "1px solid grey",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <h4>
                      {currentUserdata ? currentUserdata.username : <p></p>}
                    </h4>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "150%",
                      }}
                    >
                      <h6 onClick={handleShow2}>
                        {" "}
                        Abonnements :
                        {currentUserdata.follow.length > 0 ? (
                          currentUserdata.follow.length
                        ) : (
                          <span>0</span>
                        )}
                      </h6>
                      <h6 onClick={handleShow}>
                        {" "}
                        Abonnés :
                        {currentUserdata.following.length > 0 ? (
                          currentUserdata.following.length
                        ) : (
                          <span>0</span>
                        )}
                      </h6>
                    </div>
                    {currentUserdata.id !== uid ? (
                      <div>
                        {isFollow ? (
                          <button onClick={unfollowclick}>unFollow</button>
                        ) : (
                          <button onClick={followclick}>Follow</button>
                        )}
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-1">
                <Link
                  style={{
                    margin: "4px",
                    width: "120px",
                    textDecoration: "none",
                  }}
                  exact
                  to="posts"
                  className="col-4 "
                >
                  <IconButton>
                    {" "}
                    <span
                      style={{
                        marginLeft: "5px",
                        fontSize: "18px",
                        whiteSpace: "nowrap",
                        color: "black",
                      }}
                    >
                      Posts
                    </span>
                  </IconButton>
                </Link>{" "}
                <Link
                  style={{
                    margin: "4px",
                    width: "120px",
                    textDecoration: "none",
                  }}
                  exact
                  to="partages"
                  className="col-4 "
                >
                  <IconButton>
                    {" "}
                    <span
                      style={{
                        marginLeft: "5px",
                        fontSize: "18px",
                        whiteSpace: "nowrap",
                        color: "black",
                      }}
                    >
                      {" "}
                      Partages
                    </span>
                  </IconButton>
                </Link>{" "}
                <Link
                  style={{
                    margin: "4px",
                    width: "120px",
                    textDecoration: "none",
                  }}
                  exact
                  to="playlists"
                  className="col-4 "
                >
                  <IconButton>
                    {" "}
                    <span
                      style={{
                        marginLeft: "5px",
                        fontSize: "18px",
                        whiteSpace: "nowrap",
                        color: "black",
                      }}
                    >
                      PlayLists
                    </span>
                  </IconButton>
                </Link>
              </div>

              <div className="col-11">
                <Outlet />
              </div>
            </div>
          </div>
          <Modal show={show} onHide={handleClose} size="sm" centered>
            <ModalHeader closeButton>
              <Modal.Title>Abonnés</Modal.Title>
            </ModalHeader>
            <Modal.Body>
              {currentUserdata.following.map((d, index) => (
                <div key={index}>
                  <span>{d.username}</span> <br />
                </div>
              ))}
            </Modal.Body>
          </Modal>
          <Modal show={show2} onHide={handleClose2} size="sm" centered>
            <ModalHeader closeButton>
              <Modal.Title>Abonnements</Modal.Title>
            </ModalHeader>
            <Modal.Body>
              {currentUserdata.follow.map((d, index) => (
                <div key={index}>
                  <span>{d.username}</span> <br />
                </div>
              ))}
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <p></p>
      )}
    </>
  );
}

export default Profil;
