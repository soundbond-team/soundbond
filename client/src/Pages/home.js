import "../App.css";
import React from "react";
import Microphone from "../components/Microphone/Microphone";

import { Link, Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="container">
            <div className="row justify-content-center">
              <Microphone pushFile={null} />
            </div>
          </div>
          <br /> <br />
          <div className="container">
            <div className="row d-flex justify-content-center">
              <Link
                style={{ margin: "4px" }}
                type="button"
                to="allposts"
                className="col-4 btn btn-dark"
              >
                Tous les posts
              </Link>
              <Link
                style={{ margin: "4px" }}
                type="button"
                to="trending"
                className="col-4 btn btn-dark"
              >
                Abonnements
              </Link>
            </div>
          </div>
          <br /> <br />
          <br /> <br />
          <br /> <br />
          <div className="container d-flex justify-content-center">
            {" "}
            <div className="container">
              <Outlet />
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default Home;
