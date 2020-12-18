import React from "react";
import "./App.css";

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
      isSignedIn: false,
      user: {},
    };
  }

  loadUser = (user) => {
    this.setState({
      user: {
        ...user,
      },
      imageUrl: "",
      box: {},
      input: "",
      isSignedIn: true,
    });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.querySelector("#inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
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
      .then((response) => {
        this.displayFaceBox(this.calculateFaceLocation(response));
        if (response) {
          fetch("http://localhost:5000/image", {
            method: "put",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((resp) => resp.json())
            .then((count) => {
              this.setState({
                user: {
                  ...this.state.user,
                  entries: count,
                },
              });
            });
        }
      })
      .catch((err) => console.log(err));
  };

  Main = () => (
    <div>
      <Rank
        name={this.state.user.name}
        entries={this.state.user.entries}
        isSignedIn={this.state.isSignedIn}
      />
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
          <Route
            exact
            path="/signin"
            component={() => <SignIn loadUser={this.loadUser} />}
          />
          <Route
            exact
            path="/signup"
            component={() => <SignIn loadUser={this.loadUser} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
