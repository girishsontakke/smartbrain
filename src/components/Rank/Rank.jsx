import React from "react";
import "./rank.scss";

const Rank = ({ name, entries, isSignedIn }) => {
  return (
    <div className="center rank__container">
      {isSignedIn ? (
        <div>
          <span className="rank__text">{`${name}, your current score is `}</span>
          <span className="rank">{`${entries}`}</span>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Rank;
