import React from 'react';
import "./Search.css";
import { useSelector } from "react-redux";
import {useState, useEffect} from 'react';
import Post from "../Post/Post";
import { getAllPostTag, getByTag } from '../../../../server/controllers/post.controller';
function Search(props){

    const datas= useSelector((state) => state.postReducer);
    const [searchTerm, setsearchTerm] = useState("");
    const [searchShow, setSearchShow] = useState(false); 

    
    const postsTag = getAllPostTag(searchTerm);

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
                <input
                    type="text" 
                    name="searchBar"
                    id="searchBar"
                    placeholder="Rechercher"
                    onChange={handleSearchTerm}
                 />
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