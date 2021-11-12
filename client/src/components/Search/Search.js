import React from 'react';
import "./Search.css";
import {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import Post from "../Post/Post";
import { set } from 'js-cookie';


function Search(props){
    const [datas, setDatas] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/post/')
        .then((response) => response.json())
        .then((json) => setDatas(json));
      }, []); 

      const handleSearchTerm = (e)=>{
          let value = e.target.value;
          setsearchTerm(value);
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
                    return <div className="search_result" key={val.id}>
                    {val.description}</div>
                })}
                
             </div>
           
        </>
    );
}

export default Search