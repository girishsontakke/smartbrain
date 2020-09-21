import React from "react";

function FaceRecognition(props) {
  return (
    <div className="center">
      <img src={`${props.imageUrl}`} alt="" width="500px" height="auto" />
    </div>
  );
}

export default FaceRecognition;
