import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import home from "../../Pages/home";
import Register from "../../pages/Register/Register";
import Login from  "../../pages/Login/Login";
import SoundMap from "../../pages/SoundMap/SoundMap";
import Profil from "../../pages/Profil/Profil";
import Navbar from "../../components/Navbar/Navbar";


//import MapPage from "../../pages/MapPage";
//le routing ne sert a rien tant quil nya pas une persistance pour tt les elements ( post )
const routes = () => {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={home} />
        <Route path="/register" exact render= {()=> <Register/>}/>
        <Route path="/login" exact render= {()=> <Login/>}/>
        <Route path="/map" exact render= {()=> <SoundMap/>}/>
        <Route path="/profil" exact render= {()=> <Profil/>}/>
        <Redirect to="/"/>
      </Switch>
    </Router>
  );
};

export default routes;
//!         <Route path="/" exact render= {()=> <Home/>}/>
