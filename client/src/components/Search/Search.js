import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { Tooltip } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import "./Search.css";
function Search() {
  const [recherche, setRecherche] = useState(" ");
  const refinput = React.useRef();
  const [tagexist, setTagexist] = useState(false);
  const [userexist, setUserexist] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const [userSuggestion, setUserSuggestion] = useState([]);
  const navigateToTag = async () => {
    await findIfTagExist(recherche);

    if (tagexist === true) {
      setTagexist(false);
      let temptag = recherche;

      setRecherche(" ");
      refinput.current.value = null;
      setOpen(false);
      setUserSuggestion([]);
      navigate(`/tag/${temptag.substring(1)}`);
    }
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const findIfTagExist = async (recherche) => {
    let tagbody = recherche;

    await axios({
      method: "post",
      url: `http://localhost:8080/api/v1/post/getTag`,
      data: {
        tag: tagbody,
      },
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

  const findifuserexist = async (username) => {
    await axios({
      method: "get",
      url: `http://localhost:8080/api/v1/user/username/${username}`,
    })
      .then((res) => {
        if (res.data !== "" && res.data != null) {
          setUserexist(true);
          setOpen(false);
        } else {
          setUserexist(false);
          setOpen(true);
          showtooltiptofalse();
        }
      })
      .catch((err) => {
        setUserexist(false);
      });
  };

  const navigateTouser = async () => {
    await findifuserexist(recherche);
    if (userexist === true) {
      setUserexist(false);
      let tempuser = recherche;

      setRecherche(" ");
      refinput.current.value = null;
      setOpen(false);
      setUserSuggestion([]);
      navigate(`/profil/${tempuser}`);
    }
  };
  function onChangesearch(e) {
    setOpen(false);
    setRecherche(e.target.value.replace(/\s/g, ""));
    getAllUsers();
    console.log(userSuggestion);
  }

  async function getAllUsers() {
    await axios({
      method: "get",
      url: `http://localhost:8080/api/v1/user/recherche/${recherche}`,
    })
      .then((res) => {
        console.log(res);
        if (res.data !== "" && res.data != null) {
          setUserSuggestion(res.data);
        } else {
          setUserSuggestion([]);
        }
      })
      .catch((err) => {
        setUserSuggestion([]);
      });
  }

  function navigateToUserOption(name) {
    setUserexist(false);
    let tempuser = recherche;

    setRecherche(" ");
    refinput.current.value = null;
    setUserSuggestion([]);
    setOpen(false);
    navigate(`/profil/${name}`);
  }

  function getAllTags() {}
  return (
    <>
      <div className="d-flex ">
        <>
          <div
            style={{
              width: "200px",
            }}
          >
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                recherche.includes("#")
                  ? "Aucun post ne possède ce tag"
                  : "Aucun utilisateur trouvé"
              }
            >
              <input
                className="form-control me-2"
                type="search"
                autocomplete
                list="suggestion"
                placeholder="Rechercher"
                aria-label="Search"
                multiple
                pattern="^\S+$"
                ref={refinput}
                value={recherche !== " " ? recherche : null}
                onChange={onChangesearch}
                data-toggle="popover"
                data-content="And here's some amazing content. It's very engaging. Right?"
              />
            </Tooltip>
            <ul
              style={{
                listStyle: "none",

                width: "200px",
                position: "fixed",
                zIndex: "10",
              }}
            >
              {userSuggestion.length > 0 ? (
                userSuggestion.map((user) => (
                  <li
                    onClick={() => navigateToUserOption(user.username)}
                    style={{
                      padding: "5px 10px 5px 10px",
                      border: "1px solid black",
                      cursor: "pointer",
                      backgroundColor: "white",
                    }}
                    key={user.id}
                  >
                    {user.username}
                  </li>
                ))
              ) : (
                <span />
              )}
            </ul>
          </div>
        </>

        <div className="input-group-append">
          {" "}
          <div>
            {" "}
            <button
              className="btn btn-outline-secondary"
              style={{ marginRight: "50px" }}
              onClick={recherche.includes("#") ? navigateToTag : navigateTouser}
              type="button"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
