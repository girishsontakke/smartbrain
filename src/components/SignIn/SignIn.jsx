import React from "react";
import "./SignIn.scss";
import { Button } from "@material-ui/core";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      email: "",
      password: "",
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="container">
        <form
          action=""
          className="container__form"
          onSubmit={this.handleSubmit}
        >
          <h1>Sign In</h1>
          <div className="center emailField">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={this.handleChange}
            />
            <label htmlFor="email" className={email.length ? "shrink" : ""}>
              email
            </label>
          </div>
          <div className="center passwordField">
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={this.handleChange}
            />
            <label
              htmlFor="password"
              className={password.length ? "shrink" : ""}
            >
              password
            </label>
          </div>
          <Button
            variant="contained"
            color="primary"
            className="submit__button"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default SignIn;
