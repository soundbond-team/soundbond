import { TextField, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../Post/Post";
import { getPostByTag } from "../../actions/post.actions";
import Grid from "@material-ui/core/Grid";
function SearchBox(props) {
  const [searchTerm, setsearchTerm] = useState(" ");
  const [searchShow, setSearchShow] = useState(false);
  const datas = useSelector((state) => state.searchReducer);
  const dispatch = useDispatch();

  const handleSearchTerm = async () => {
    if (searchTerm === " ") {
      setSearchShow(false);
    } else {
      setSearchShow(true);

      await dispatch(getPostByTag(searchTerm));
    }
  };

  const changevalue = (e) => {
    setsearchTerm(e.target.value);
  };
  return (
    <>
      <div className="container">
        <TextField
          onChange={changevalue}
          fullWidth
          id="tag"
          name="tag"
          type="text"
          placeholder="recherche par tag"
        />
        <IconButton onClick={handleSearchTerm}>
          <SearchOutlined />
        </IconButton>
      </div>
    </>
  );
}

export default SearchBox;
