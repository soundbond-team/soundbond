import "../App.css";
import React from "react";
import Microphone from "../components/Microphone/Microphone";
import Search from "../components/Search/Search";
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
              <Search
                placeholder="Search"
                className="col-4 btn btn-dark"
                onChange={(e) => console.log(e.target.value)}
              /><br></br>
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
              </Link><br></br>

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
