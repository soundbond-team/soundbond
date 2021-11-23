import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import React,{useState} from 'react';
import { useDispatch} from "react-redux";
import Post from "../Post/Post";
import {getPostByTag} from "../../actions/search.actions";


function Search(props){
    const [datas, setDatas] = useState([]);
    const [searchTerm, setsearchTerm] = useState("");
    const [searchShow, setSearchShow] = useState(false); 
    
    const dispatch = useDispatch();

    const handleSearchTerm = (e)=>{
          let value = e.target.value;
          setsearchTerm(value);
          if(e.target.value===""){
            setSearchShow(false);
          }
          else {
            setSearchShow(true);
            const getTag = async() =>{
              await dispatch(getPostByTag(searchTerm));
            };
            setDatas(getTag);   
          }
    }
    console.log(datas);
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
                }).map((val) =>{
                    if (searchShow){
                    return <div className="search_result" key={val.id}><br></br>
                     <Post post={val} /><br></br><br></br><br></br></div>}
                })}
             </div> 
        </>
    );
}

export default Search;