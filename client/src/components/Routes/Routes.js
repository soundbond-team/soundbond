import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
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
      <Routes>
        <Route path="/" element={<Navigate to="home/allposts" />} />
        <Route path="/share" element={<Share />} />
        <Route path="/home" element={<Home />}>
          <Route path="allposts" element={<Allposts />} />
          <Route path="trending" element={<TrendingPost />} />
        </Route>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/profil/:username" element={<Profil />} />
        {/* <Navigate to="/" />*/}
      </Routes>{" "}
    </Router>
  );
};

export default routes;
