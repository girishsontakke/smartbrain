import React from "react";
import { Button } from "@material-ui/core";
import "./navigation.scss";

const Navigation = () => {
  return (
    <nav className="nav">
      <Button variant="contained" color="primary">
        {"Sign In"}
      </Button>
    </nav>
  );
};

export default Navigation;
