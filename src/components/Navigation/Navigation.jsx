import React from "react";
import { Button } from "@material-ui/core";
import "./navigation.scss";
import { Link, withRouter } from "react-router-dom";

const Navigation = (props) => {
  console.log(props);
  return (
    <nav className="nav">
      <Button variant="contained" color="primary">
        {props.location.pathname === "/signin" ? (
          <Link to="/">{"Home"}</Link>
        ) : (
          <Link to="/signin">{"Sign In"}</Link>
        )}
      </Button>
    </nav>
  );
};

export default withRouter(Navigation);
