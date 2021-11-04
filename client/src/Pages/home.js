import "../App.css";

import Microphone from "../components/Microphone/Microphone";
import { useSelector } from "react-redux";

import Post from "../components/Post/Post";
import Grid from "@material-ui/core/Grid";

function Home() {
  // These, in 'state', are defined in index.js
  const allposts = useSelector((state) => state.postReducer); // On stocke tous les Posts (se mettra a jour automatiquement par rapport a letat du reducer).

  return (
    <>
      <div className="row">
        <div className="container">
          <div className="row justify-content-center">
            <Microphone pushFile={null} />
          </div>
        </div>
        <div className="container">
          {
            <Grid container direction="column-reverse" spacing={3}>
              {allposts.length > 0 ? (
                allposts.map((i, index) => (
                  <Grid key={index} item>
                    <Post post={i} />
                  </Grid>
                ))
              ) : (
                <p></p>
              )}
            </Grid>
          }
        </div>
      </div>
    </>
  );
}

export default Home;
