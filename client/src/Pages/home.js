import "../App.css";
import React, { useEffect } from "react";
import Microphone from "../components/Microphone/Microphone";
import GroupIcon from "@mui/icons-material/Group";
import { Link, Outlet, useNavigate } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@mui/icons-material/Home";
function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/home/allposts`);
    react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-1">
            <div className="container-fluid">
              <div className="row">
                <Link style={{ textDecoration: "none" }} exact to="allposts">
                  <IconButton>
                    <HomeIcon style={{ fill: "black", fontSize: "25px" }} />
                    <span
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
              <div className="row">
                <Link style={{ textDecoration: "none" }} exact to="trending">
                  <IconButton>
                    <GroupIcon style={{ fill: "black", fontSize: "25px" }} />
                    <span
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
              <br></br>
            </div>
          </div>
          <div className="col-11 ">
            <div className="row ">
              {" "}
              <Microphone pushFile={null} />
              <br /> <br />{" "}
            </div>
            <div className="row ">
              <Outlet />
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
