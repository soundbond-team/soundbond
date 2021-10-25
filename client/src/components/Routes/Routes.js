import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import home from "../../Pages/home";
import Share from "../../components/Share/Share";
import Nav from "../../components/Navbar/Navbar";
//le routing ne sert a rien tant quil nya pas une persistance pour tt les elements ( post )
const routes = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={home} />
        <Route path="/share" exact component={Share} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default routes;
