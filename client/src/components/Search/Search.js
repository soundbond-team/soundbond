import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import React,{useState,useEffect} from 'react';
import Post from "../Post/Post";

function Search(props){
    const [datas, setDatas] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");
    const [searchShow, setSearchShow] = useState(false); 

    useEffect(() =>{
        fetch('http://localhost:8080/api/v1/post/getPostByTag')
        .then((response) => response.json())
        .then((json) => setDatas(json));
    },[]);

    console.log(datas);

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
            <TextField
                fullWidth
                id="tag"
                name="tag"
                type="text"
                placeholder="recherche par tag"
                InputProps={{
                  endAdornment: (
                    <IconButton>
                      <SearchOutlined />
                    </IconButton>
                  ),
                }}
                onChange={handleSearchTerm }
              />
            
            <div className="search_results">
                {datas.filter((val)=> {
                    return val.tag.toLowerCase().includes(searchTerm.toLowerCase()) 
                }).map((val,index) =>{
                    if (searchShow){
                    return <div className="search_result" key={val.id}><br></br>
                     <Post post={val} /><br></br><br></br><br></br></div>}
                })}
             </div>
           
        </>
    );
}

export default Search