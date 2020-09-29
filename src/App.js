import React from "react";
import "./App.scss";

//component
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkeForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";

//ext libraries
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import { Route, Switch } from "react-router-dom";

const app = new Clarifai.App({
  apiKey: process.env.REACT_APP_CLARIFAI_API_KEY,
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
      box: {},
    };
  }
  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector("#inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };
  onFormSubmit = (event) => {
    event.preventDefault();
    this.setState((prevstate) => ({ imageUrl: prevstate.input }));
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch((err) => console.log(err));
  };

  Main = () => (
    <div>
      <Rank />
      <ImageLinkForm
        input={this.state.input}
        onInputChange={this.onInputChange}
        onFormSubmit={this.onFormSubmit}
      />
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
    </div>
  );
  render() {
    return (
      <div className="App">
        <Particles params={particleOptions} className="particles" />
        <Navigation />
        <Logo />
        <Switch>
          <Route exact path="/" component={this.Main} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignIn} />
        </Switch>
      </div>
    );
  }
}

export default App;
