import React from "react";
import { Button } from "@material-ui/core";
import "./navigation.scss";
import { Link, withRouter } from "react-router-dom";

const Navigation = (props) => {
  return (
    <nav className="nav">
      {props.location.pathname === "/" ? (
        <Link to="/signin">
          <Button variant="contained" color="primary">
            {props.isSignedIn ? "Sign out" : "Sign in"}
          </Button>
        </Link>
      ) : props.location.pathname === "/signup" ? (
        <Link to="/signin">
          <Button variant="contained" color="primary">
            {"Sign In"}
          </Button>
        </Link>
      ) : (
        <Link to="/signup">
          <Button variant="contained" color="primary">
            {"Sign Up"}
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default withRouter(Navigation);
