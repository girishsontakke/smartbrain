import React from "react";
import "./imageLinkForm.scss";
import { TextField, Button } from "@material-ui/core";

function ImageLinkForm({ onInputChange, onFormSubmit, input }) {
  return (
    <div className="center">
      <div className="center" style={{ flexDirection: "column" }}>
        <p className="intro">
          {"This magic brain will detect faces in Your image, give it a try"}
        </p>
        <form onSubmit={onFormSubmit} className="form">
          <TextField
            id="link"
            label="Enter link of Image"
            color="primary"
            onChange={onInputChange}
          />
          <Button
            disabled={!input}
            type="submit"
            variant="contained"
            size="small"
            style={{
              color: "white",
              margin: "10px",
              backgroundColor: "rgba(78, 39, 75, .7)",
            }}
          >
            Detect
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ImageLinkForm;
