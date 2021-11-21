import React from 'react';
import "./Search.css";
import { useSelector,useDispatch} from "react-redux";
import {useState, useEffect,useContext} from 'react';
import Post from "../Post/Post";
import { UidContext } from "../Appcontext";
import { useHistory } from 'react-router-dom';

function Search(props){

    const datas = useSelector((state) => state.postReducer);
    
    const dispatch = useDispatch();
    const uid = useContext(UidContext);

    const [searchTerm, setsearchTerm] = useState("");
    const [searchShow, setSearchShow] = useState(false); 

    /*const tag = async(e)=>{
        await dispatch(getByTag(props.tag_id,uid,e.target.value, postData));
    };
    const datas = async () => {
         await dispatch(getAllPost(props.taggind_id,uid, tag, postData));
  };*/


      const handleSearchTerm = (e)=>{
          let value = e.target.value;
          setsearchTerm(value);

          if(e.target.value===""){
            setSearchShow(false);
          }
          else {
            setSearchShow(true);
          }
      }

    return (
        <>
            <div className="search">
                <form>
                <input
                    type="text" 
                    name="tag"
                    id="tag"
                    placeholder="recherche par tag"
                    onChange={handleSearchTerm}
                 />
                 <button type="submit">Rechercher</button>
                 </form>
            </div> 
            <div className="search_results">

                {datas.filter((val)=> {
                    return val.description.toLowerCase().includes(searchTerm.toLowerCase())
                }).map((val) =>{
                    if (searchShow){
                    return <div className="search_result" key={val.id}>
                     <Post post={val} /><br></br><br></br><br></br></div>}
                })}
             </div>
           
        </>
    );
}

export default Search