import React from 'react';
import "./Search.css";
import { useSelector } from "react-redux";
import {useState, useEffect} from 'react';
import Post from "../Post/Post";
function Search(props){

    //const datas= useSelector((state) => state.postReducer);
    //const datas = getByTag();

    const [searchTerm, setsearchTerm] = useState("");
    const [searchShow, setSearchShow] = useState(false); 


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
                    return val.tag.toLowerCase().includes(searchTerm.toLowerCase())
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