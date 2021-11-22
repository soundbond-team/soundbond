import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { useDispatch } from "react-redux";
import React,{useState} from 'react';
import Post from "../Post/Post";
import axios from "axios";
export const GET_POST_BY_TAG = "GET_POST_BY_TAG ";
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
          }
          return (dispatch) => {
            return axios
              .get(`http://localhost:8080/api/v1/post/getPostByTag/${searchTerm}`)
              .then((res) => {
                dispatch({ type: GET_POST_BY_TAG , payload: res.data });
                console.log(res.data);
                setDatas(res.data);
              })
              .catch((err) => console.log(err));
          }; 
          
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
                {datas?datas.filter((val)=> {
                    return val.tag.toLowerCase().includes(searchTerm.toLowerCase()) 
                }).map((val) =>{
                    if (searchShow){
                    return <div className="search_result" key={val.id}><br></br>
                     <Post post={val} /><br></br><br></br><br></br></div>}
                }):<span></span>}
             </div>
           
        </>
    );
}

export default Search