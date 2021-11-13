import React from 'react';
import "./Search.css";
import {useState, useEffect} from 'react';
import Post from "../Post/Post";
function Search(props){
    const [datas, setDatas] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");
    const [searchShow, setSearchShow] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/post/')
        .then((response) => response.json())
        .then((json) => setDatas(json));
      }, []); 

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
                     <Post post={val} /></div>}
                })}
                
             </div>
           
        </>
    );
}

export default Search