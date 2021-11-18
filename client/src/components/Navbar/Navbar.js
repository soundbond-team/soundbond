import React, { useContext, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
//import { Chat, Notifications, Person, Search } from "@material-ui/icons"

import Logout from "../Logout";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { UidContext } from "../Appcontext";
import { useSelector } from "react-redux";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Tooltip } from "@material-ui/core";
function NavigationBar() {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const [tag, setTag] = useState(" ");
  const refinput = React.useRef();
  const [tagexist, setTagexist] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigateToTag = () => {
    findIfTagExist(tag);
    if (tagexist) {
      let temptag = tag;
      setTag(" ");
      refinput.current.value = null;

      navigate(`/tag/${temptag}`);
    }
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const findIfTagExist = async (tag) => {
    await axios({
      method: "get",
      url: `http://localhost:8080/api/v1/post/getTag/${tag}`,
    })
      .then((res) => {
        // document.getElementById("submitbutton").disabled = true;
        if (res.data === true) {
          setTagexist(true);
          setOpen(false);
        } else {
          setTagexist(false);
          setOpen(true);
          showtooltiptofalse();
          navigate(`/home/allposts`);
        }
      })
      .catch((err) => {
        setTagexist(false);
        console.log(err);
      });
  };
  const showtooltiptofalse = () => {
    setTimeout(function () {
      //Start the timer
      setOpen(false); //After 1 second, set render to true
    }, 4000);
  };
  const navigate = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <NavLink
            activeStyle={{ style: "none" }}
            className="navbar-brand"
            exact
            to="/home/allposts"
            style={{ textDecoration: "none" }}
          >
            Soundbond
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  exact
                  to="/map"
                  style={{ textDecoration: "none" }}
                >
                  Map
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  exact
                  to={`/profil/${userData.username}`}
                  style={{ textDecoration: "none" }}
                >
                  Profil
                </NavLink>
              </li>
            </ul>
            <div className="d-flex ">
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={"Aucun post ne possède ce tag"}
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Rechercher par tag"
                  aria-label="Search"
                  multiple
                  pattern="^\S+$"
                  ref={refinput}
                  onChange={(e) => {
                    setTag(e.target.value.replace(/\s/g, ""));
                  }}
                  data-toggle="popover"
                  title="Popover title"
                  data-content="And here's some amazing content. It's very engaging. Right?"
                />
              </Tooltip>
              <div className="input-group-append">
                {" "}
                <div>
                  {" "}
                  <button
                    className="btn btn-outline-secondary"
                    style={{ marginRight: "50px" }}
                    onClick={navigateToTag}
                    type="button"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <form className="d-flex">
              {uid ? (
                <>
                  <span style={{ margin: "4px" }}>
                    Bonjour {userData.username}
                  </span>

                  <Logout />
                </>
              ) : (
                <>
                  {" "}
                  <NavLink
                    className="nav-link"
                    exact
                    to="/login"
                    style={{ textDecoration: "none" }}
                  >
                    Se connecter
                  </NavLink>
                  <NavLink
                    className="nav-link"
                    exact
                    to="/register"
                    style={{ textDecoration: "none" }}
                  >
                    S'inscrire
                  </NavLink>
                </>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
export default NavigationBar;
