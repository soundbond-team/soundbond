import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import home from "../../Pages/Home/Home";
//import MapPage from "../../pages/MapPage";
import Registration from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import Nav from "../Navbar/Navbar";
//le routing ne sert a rien tant quil nya pas une persistance pour tt les elements ( post )
const routes = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={home} />
        <Route path="/register" exact component={Registration} />
        <Route path="/login" exact component={Login} />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default routes;
