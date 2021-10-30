import React, {useState } from "react";

import {useHistory} from 'react-router-dom';
import axios from "axios";

export default function Registration() {
 
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  
  const handleSignup=async (e)=>{
    e.preventDefault();
    await axios({
      method: "post",
      url: `http://localhost:8080/api/v1/user/register`,
      data:{
        username:username,
        password:password
      }
    }).then((res)=>{
      if(res.data.err){
        console.log(res.data.err);
        setErr("Username déja utilisé (ou autre erreur)");
      }
      else{
        history.push("/login");
        
      }
    }).catch((err)=>{
      console.log(err);
      
    })

  }
 


    return (
        <>
      <div className="container">
        <h1> S'inscrire </h1>
        <form action="" onSubmit={handleSignup} id="sign-up">
          <label htmlFor="username">Pseudo</label>
          <br/>
          <input type="text" name="username" id="username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
          <br /><br />
          <label htmlFor="password">Mot de passe</label>
          <br/>
          <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
          <br /><br />
          <input type="submit" value="S'inscrire"/>

        </form>
        {err}
        </div>
     </>
    );

}

