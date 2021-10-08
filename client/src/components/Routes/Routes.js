import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import home from "../../pages/home";
import MapPage from "../../pages/MapPage";
import Nav from "../../components/Navbar/Navbar";
const routes = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={home} />
        <Route path="/map" exact component={MapPage} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default routes;
