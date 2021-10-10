import React from "react";

import AudioPlayer from "../AudioPlayer/AudioPlayer";

function Post(props) {
  return (
    <>
      <AudioPlayer file={props.file} position={props.position} />
    </>
  );
}

export default Post;
