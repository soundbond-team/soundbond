import "../App.css";
import React, { useEffect } from "react";
import Microphone from "../components/Microphone/Microphone";
import GroupIcon from "@mui/icons-material/Group";
import { Link, Outlet, useNavigate } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import FollowSuggestion from "../components/FollowSuggestion/FollowSuggestion";
import BookmarkIcon from "@mui/icons-material/Bookmark";
function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/home/allposts`);
    // eslint-disable-next-line
  }, []);
  
  return (
    <>
      <div className="container">
        <div className="row" style={{ width: "100%", margin: 0 }}>
          <div className="col-1 d-flex justify-content-around">
            <div style={{ zIndex: 2, position: "fixed" }}>
              <br /> <br />
              <Microphone pushFile={null} />
              <br />
              <div className="row d-flex justify-content-end">
                <Link style={{ textDecoration: "none" }} exact to="allposts">
                  <IconButton>
                    <HomeIcon style={{ fill: "black", fontSize: "25px" }} />
                    <span
                      className="d-lg-block d-none"
                      style={{
                        marginLeft: "5px",
                        fontSize: "18px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Accueil
                    </span>
                  </IconButton>
                </Link>
              </div>
              <div className="row d-flex justify-content-start">
                <Link style={{ textDecoration: "none" }} exact to="trending">
                  <IconButton>
                    <GroupIcon style={{ fill: "black", fontSize: "25px" }} />
                    <span
                      className="d-lg-block d-none"
                      style={{
                        marginLeft: "5px",
                        fontSize: "18px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Abonnements
                    </span>
                  </IconButton>
                </Link>
              </div>
              <div className="row d-flex justify-content-start">
                <Link
                  style={{ textDecoration: "none" }}
                  exact
                  to="enregistrement"
                >
                  <IconButton>
                    <BookmarkIcon style={{ fill: "black", fontSize: "25px" }} />
                    <span
                      className="d-lg-block d-none"
                      style={{
                        marginLeft: "5px",
                        fontSize: "18px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Enregistrements
                    </span>
                  </IconButton>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-10 " text-center>
            <Outlet />
          </div>

          <div className="col-1  d-none d-md-block" text-center>
            <div style={{ zIndex: 2, position: "fixed" }}>
              <h3 style={{ fontWeight: "normal" }}> Suggestions</h3>
              <br />
              <FollowSuggestion />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
