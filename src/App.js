import React from "react";
import "./App.scss";

//component
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkeForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

//ext libraries
import Particles from "react-particles-js";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "f22d3456a6464bafbfeb79b8d48ea504",
});

const particleOptions = {
  particles: {
    number: {
      value: 20,
      density: {
        enable: true,
        value_area: 200,
      },
    },
  },
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
    };
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };
  onFormSubmit = (event) => {
    event.preventDefault();
    this.setState((prevstate) => ({ imageUrl: prevstate.input }));
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function (response) {
        console.log(response);
      },
      function (err) {
        // there was an error
        console.log(err);
      }
    );
  };
  render() {
    return (
      <div className="App">
        <Particles params={particleOptions} className="particles" />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          input={this.state.input}
          onInputChange={this.onInputChange}
          onFormSubmit={this.onFormSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
