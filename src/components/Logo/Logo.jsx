import React from "react";
import Tilt from "react-tilt";
import "./logo.scss";

function Logo() {
  return (
    <div className="logo">
      <Tilt
        className="Tilt"
        options={{ max: 55 }}
        style={{ height: 120, width: 120 }}
      >
        <div className="Tilt-inner">
          <span role="img" aria-label="logo">
            <img
              src="https://img.icons8.com/wired/64/000000/brain.png"
              alt="logo"
            />
          </span>
        </div>
      </Tilt>
    </div>
  );
}

export default Logo;
