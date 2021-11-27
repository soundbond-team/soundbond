import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "../../Pages/home";

import Nav from "../../components/Navbar/Navbar";
import MapPage from "../../Pages/MapPage";
import Registration from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import Profil from "../../Pages/Profil/Profil";
import Allposts from "../../components/AllPosts/allposts";
import TrendingPost from "../../components/Trending/trending";
import TagPage from "../../Pages/TagPage/tagpage";
import MesPartages from "../MesPartages/MesPartages";
import MyPosts from "../MyPosts/MyPosts";

//le routing ne sert a rien tant quil nya pas une persistance pour tt les elements ( post )
const routes = () => {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Navigate to="home/allposts" />} />

        <Route exact path="/tag/:tag" element={<TagPage />} />
        <Route exact path="/home" element={<Home />}>
          <Route exact path="allposts" element={<Allposts />} />
          <Route exact path="trending" element={<TrendingPost />} />
        </Route>
        <Route exact path="/register" element={<Registration />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/map" element={<MapPage />} />
        <Route exact path="/profil/:username" element={<Profil />}>
          <Route exact path="posts" element={<MyPosts />} />
          <Route exact path="partages" element={<MesPartages />} />
        </Route>

        {/*<Route path="/upload_file" element={<FileUpload/>} />*/}
        {/* <Navigate to="/" />*/}
      </Routes>{" "}
    </Router>
  );
};

export default routes;
