/*
  This component renders a SearchBox and redirects to /tag of /profil,
  depending of search results.
*/

import SearchBox from "../../components/Search/SearchBox";
import { useNavigate } from "react-router-dom";

import "./Search.css";

export default function Search() {
  const navigate = useNavigate();
  const childToParent = async (results, type) => {
    if(type === "tag"){
      navigate(`/tag/${results}`);
    } else if (type === "user"){
      navigate(`/profil/${results}/posts`);
    }
  };

  return (
    <>
      <SearchBox
        placeholder="SearchBox"
        className="col-4 btn btn-dark"
        childToParent={childToParent}
      />
    </>

  );
}
