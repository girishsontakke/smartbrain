import React from "react";
import { Button } from "@material-ui/core";
import "./navigation.scss";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="nav">
      <Link to="/signin">
        <Button variant="contained" color="primary">
          {"Sign In"}
        </Button>
      </Link>
    </nav>
  );
};

export default Navigation;
