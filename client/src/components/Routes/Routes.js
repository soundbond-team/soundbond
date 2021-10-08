import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import home from "../../Pages/home";

const routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={home} />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default routes;
