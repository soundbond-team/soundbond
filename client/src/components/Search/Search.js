import React, { useState } from "react";

import { Tooltip } from "@material-ui/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Search() {
  const [tag, setTag] = useState(" ");
  const refinput = React.useRef();
  const [tagexist, setTagexist] = useState(false);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const navigateToTag = async () => {
    await findIfTagExist(tag);

    if (tagexist === true) {
      setTagexist(false);
      let temptag = tag;

      setTag(" ");
      refinput.current.value = null;
      setOpen(false);
      navigate(`/tag/${temptag.substring(1)}`);
    }
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const findIfTagExist = async (tag) => {
    let tagbody = tag;

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
  return (
    <>
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
            value={tag !== " " ? tag : null}
            onChange={(e) => {
              setTag(e.target.value.replace(/\s/g, ""));
            }}
            data-toggle="popover"
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
    </>
  );
}

export default Search;
