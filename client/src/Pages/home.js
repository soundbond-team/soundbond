import "../App.css";
import React, { useState } from "react";
import Microphone from "../components/Microphone/Microphone";

import Allposts from "../components/AllPosts/allposts";
import TrendingPost from "../components/Trending/trending";

function Home() {
  const [postTrendOrAll, setpostTrendOrAll] = useState(1);

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
              <button
                style={{ margin: "4px" }}
                type="button"
                onClick={() => setpostTrendOrAll(1)}
                className="col-4 btn btn-dark"
              >
                Touts les posts
              </button>
              <button
                style={{ margin: "4px" }}
                type="button"
                onClick={() => setpostTrendOrAll(2)}
                className="col-4 btn btn-dark"
              >
                Abonnements
              </button>
            </div>
          </div>
          <br /> <br />
          <br /> <br />
          <br /> <br />
          <div className="container d-flex justify-content-center">
            {" "}
            <div className="container">
              {postTrendOrAll === 1 ? <Allposts /> : <TrendingPost />}
            </div>
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default Home;
