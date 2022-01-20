import React, { useState, useEffect } from "react";
import { Tooltip } from "@material-ui/core";
import axios from "axios";
import "./Search.css";

const backServerURL = process.env.REACT_APP_BACK_SERVER_URL;

export default function SearchBox(props) {
  const [recherche, setRecherche] = useState(" ");
  const refinput = React.useRef();
  const [tagexist, setTagexist] = useState(false);
  const [userexist, setUserexist] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [tagSuggestion, setTagSuggestion] = useState([]);
  const [userSuggestion, setUserSuggestion] = useState([]);

  const navigateToTag = async () => {
    await findIfTagExists().then(() => {
      if (tagexist === true) {
        setTagexist(false);
        setRecherche("");
        refinput.current.value = null;
        setOpen(false);
        setUserSuggestion([]);
        props.childToParent(recherche.substring(1), "tag");
      }
    });
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const showtooltiptofalse = () => {
    setTimeout(function () {
      //Start the timer
      setOpen(false); //After 1 second, set render to true
    }, 4000);
  };

  const findIfTagExists = async () => {
    await axios({
      method: "post",
      url: backServerURL + `api/v1/post/getTag`,
      data: {
        tag: recherche,
      },
    })
      .then((res) => {
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
      });
  };

  const findIfUserExists = async (username) => {
    await axios({
      method: "get",
      url: backServerURL + `api/v1/user/username/${username}`,
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
    await findIfUserExists(recherche).then(() => {
      if (userexist === true) {
        setUserexist(false);
        setRecherche(" ");
        refinput.current.value = null;
        setOpen(false);
        setUserSuggestion([]);
        props.childToParent(recherche, "user");
      }
    });
  };

  function onChangesearch(e) {
    setOpen(false);
    setRecherche(e.target.value.replace(/\s/g, ""));
  }
  useEffect(() => {
    if (recherche.includes("#")) {
      getAllTags();
      setUserSuggestion([]);
    } else {
      getAllUsers();
      setTagSuggestion([]);
    } // eslint-disable-next-line
  }, [recherche]); // eslint-disable-next-line

  async function getAllUsers() {
    await axios({
      method: "get",
      url: backServerURL + `api/v1/user/recherche/${recherche}`,
    })
      .then((res) => {
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
    setRecherche("");
    refinput.current.value = null;
    setUserSuggestion([]);
    setOpen(false);
    props.childToParent(name, "user");
  }

  function navigateToTagOption(tag) {
    setTagexist(false);

    setRecherche(" ");
    refinput.current.value = null;
    setTagSuggestion([]);
    setOpen(false);
    props.childToParent(tag, "tag");
  }

  async function getAllTags() {
    await axios({
      method: "post",
      url: backServerURL + `api/v1/tag/recherche`,
      data: {
        tag: recherche,
      },
    })
      .then((res) => {
        if (res.data !== "" && res.data != null) {
          setTagSuggestion(res.data);
        } else {
          setTagSuggestion([]);
        }
      })
      .catch((err) => {
        setTagSuggestion([]);
      });
  }
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

                overflow: "auto",
                width: "200px",
                position: "fixed",
                zIndex: "10",
              }}
            >
              {userSuggestion ? (
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

              {tagSuggestion ? (
                tagSuggestion.map((tag) => (
                  <li
                    onClick={() => navigateToTagOption(tag.tag.substring(1))}
                    style={{
                      padding: "5px 10px 5px 10px",
                      border: "1px solid black",
                      cursor: "pointer",
                      backgroundColor: "white",
                    }}
                    key={tag.id}
                  >
                    {tag.tag}
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
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
