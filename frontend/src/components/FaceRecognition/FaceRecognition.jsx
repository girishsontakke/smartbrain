import React from "react";
import "./facerecognition.scss";

function FaceRecognition({ imageUrl, box }) {
  return (
    <div className="center">
      <div className="image_box">
        <img id="inputImage" src={`${imageUrl}`} alt="" />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            bottom: box.bottomRow,
            right: box.rightCol,
            left: box.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
}

export default FaceRecognition;
