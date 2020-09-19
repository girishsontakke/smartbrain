import React from "react";
import "./rank.scss";

const Rank = () => {
  return (
    <div className="center rank__container">
      <div className="rank__text">{`Girish, your current rank is....`}</div>
      <div className="rank">{`#5`}</div>
    </div>
  );
};

export default Rank;
