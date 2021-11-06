import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "../../Pages/home";
import Share from "../../components/Share/Share";
import Nav from "../../components/Navbar/Navbar";
import MapPage from "../../Pages/MapPage";
import Registration from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import Profil from "../../Pages/Profil/Profil";
import Allposts from "../../components/AllPosts/allposts";
import TrendingPost from "../../components/Trending/trending";
//le routing ne sert a rien tant quil nya pas une persistance pour tt les elements ( post )
const routes = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/share" exact component={Share} />
        <Route path="/home" exact component={Home} />
        <Route path="/register" exact component={Registration} />
        <Route path="/login" exact component={Login} />
        <Route path="/map" exact component={MapPage} />
        <Route path="/profil/:username" exact component={Profil} />
        <Route path="home/allposts" exact component={Allposts} />
        <Route path="home/trending" exact component={TrendingPost} />

        <Redirect to="/" />
      </Switch>{" "}
    </Router>
  );
};

export default routes;
