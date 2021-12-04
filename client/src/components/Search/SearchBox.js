import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Search.css";

export default function Search(props) {
  const [recherche, setRecherche] = useState(" ");
  const refinput = React.useRef();
  const [tagexist, setTagexist] = useState(false);

  const [tagSuggestion, setTagSuggestion] = useState([]);
  const navigateToTag = async () => {
    await findIfTagExist().then(() => {
      if (tagexist === true) {
        setTagexist(false);
        setRecherche("");
        refinput.current.value = null;
        props.childToParent(recherche.substring(1));
      }
    })
  };

  const findIfTagExist = async () => {
    await axios({
      method: "post",
      url: `http://localhost:8080/api/v1/post/getTag`,
      data: {
        tag: recherche,
      },
    })
      .then((res) => {
        if (res.data === true) {
          setTagexist(true);
        } else {
          setTagexist(false);
        }
      })
      .catch((err) => {
        setTagexist(false);
      });
  };

  function onChangesearch(e) {
    setRecherche(e.target.value.replace(/\s/g, ""));
  }
  useEffect(() => {
    if (recherche.includes("#")) {
      getAllTags();
    } else {
      setTagSuggestion([]);
    }
  }, [recherche]); // eslint-disable-line react-hooks/exhaustive-deps



  function navigateToTagOption(tag) {
    setTagexist(false);

    setRecherche(" ");
    refinput.current.value = null;
    setTagSuggestion([]);

    console.log("I CALLED CHILDTOPARENT WITH "+ tag);
    props.childToParent(tag);
  }

  async function getAllTags() {
    await axios({
      method: "post",
      url: `http://localhost:8080/api/v1/tag/recherche`,
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

            <ul
              style={{
                listStyle: "none",
                height: "200px",
                overflow: "auto",
                width: "200px",
                position: "fixed",
                zIndex: "10",
              }}
            >

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
              onClick={navigateToTag}
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
