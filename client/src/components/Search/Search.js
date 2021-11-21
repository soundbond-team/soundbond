import {  TextField, IconButton } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { useSelector,useDispatch} from "react-redux";
import React,{useState,useContext} from 'react';
import Post from "../Post/Post";


function Search(props){

    const datas = useSelector((state) => state.postReducer);
    //const postData = useSelector((state) => state.postReducer);


    const [searchTerm, setsearchTerm] = useState("");
    const [searchShow, setSearchShow] = useState(false); 

    /*const tag = async(e)=>{
        await dispatch(getByTag(props.tag_id,uid,e.target.value, postData));
    };
    const datas = async () => {
         await dispatch(getAllPostTag(props.taggind_id,uid, tag, postData));
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
                    return val.description.toLowerCase().includes(searchTerm.toLowerCase()) 
                }).map((val) =>{
                    if (searchShow){
                    return <div className="search_result" key={val.id}><br></br>
                     <Post post={val} /><br></br><br></br><br></br></div>}
                })}
             </div>
           
        </>
    );
}

export default Search