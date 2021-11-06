import React, { useState, useEffect, useContext } from "react";
import Post from "../../components/Post/Post";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { UidContext } from "../../components/Appcontext";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import { useDispatch, useSelector } from "react-redux";
import { follow } from "../../actions/user.actions";
import { unfollow } from "../../actions/user.actions";
import { getPostTrend } from "../../actions/post.actions";
function Profil(props) {
  const [currentUserdata, setcurrentUserdata] = useState();
  const [allposts, setallposts] = useState();
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
    const getcurrentUser = async (username) => {
      await axios({
        method: "get",
        url: `http://localhost:8080/api/v1/user/username/${username}`,
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

    getcurrentUser(props.match.params.username);
  }, [props]);

  useEffect(() => {
    const getallCurrentPost = async (id) => {
      await axios({
        method: "get",
        url: `http://localhost:8080/api/v1/post/${id}`,
      })
        .then((res) => {
          if (res.data !== "" && res.data !== null) {
            setallposts(res.data);
          } else {
            setallposts();
          }
        })
        .catch((err) => {
          setallposts();
        });
    };
    if (currentUserdata) {
      for (let i = 0; i < currentUserdata.following.length; i++) {
        if (currentUserdata.following[i].id === uid) {
          setFollow(true);

          break;
        } else {
          setFollow(false);
        }
      }
      getallCurrentPost(currentUserdata.id);
    }
  }, [currentUserdata, props]); // eslint-disable-line react-hooks/exhaustive-deps

  const pushUserdata = async (data) => {
    await setcurrentUserdata(data);
  };

  const followclick = async () => {
    setFollow(true);

    setcurrentUserdata((prevState) => ({
      ...prevState,
      following: [userData, ...prevState.following],
    }));
    await dispatch(follow(uid, currentUserdata.id));
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
    await dispatch(unfollow(uid, currentUserdata.id));
    dispatch(getPostTrend(uid));
  };

  return (
    <>
      {currentUserdata ? (
        <>
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
                  <h5>@pseudo</h5>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "150%",
                    }}
                  >
                    <h6> posts</h6>
                    <h6
                      onClick={
                        currentUserdata.following.length > 0
                          ? handleShow2
                          : handleClose2
                      }
                    >
                      {" "}
                      Abonnements :
                      {currentUserdata.follow.length > 0 ? (
                        currentUserdata.follow.length
                      ) : (
                        <span>0</span>
                      )}
                    </h6>
                    <h6
                      onClick={
                        currentUserdata.following.length > 0
                          ? handleShow
                          : handleClose
                      }
                    >
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
          <div className="container">
            {
              <Grid container direction="column-reverse" spacing={3}>
                {allposts ? (
                  allposts.map((i, index) => (
                    <Grid key={index} item>
                      <Post post={i} />
                    </Grid>
                  ))
                ) : (
                  <p></p>
                )}
              </Grid>
            }
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
