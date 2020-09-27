import React from "react";
import { Button } from "@material-ui/core";
import "./navigation.scss";
import { Link, withRouter } from "react-router-dom";

const Navigation = (props) => {
  console.log(props);
  return (
    <nav className="nav">
      {props.location.pathname === "/" ? (
        <Button variant="contained" color="primary">
          <Link to="/signin">{"Sign out"}</Link>
        </Button>
      ) : (
        <div></div>
      )}
    </nav>
  );
};

export default withRouter(Navigation);
