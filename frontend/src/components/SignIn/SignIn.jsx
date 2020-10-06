import React from "react";
import "./SignIn.scss";
import { Button } from "@material-ui/core";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  render() {
    const { name, email, password, confirmPassword } = this.state;
    return (
      <div className="container">
        <form
          action=""
          className="container__form"
          onSubmit={this.handleSubmit}
        >
          {this.props.location.pathname === "/signup" ? (
            <h1>Sign Up</h1>
          ) : (
            <h1>Sign In</h1>
          )}
          {this.props.location.pathname === "/signup" ? (
            <div className="center nameField">
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={this.handleChange}
              />
              <label htmlFor="name" className={name.length ? "shrink" : ""}>
                username
              </label>
            </div>
          ) : (
            ""
          )}
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
          {this.props.location.pathname === "/signup" ? (
            <div className="center passwordField">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={this.handleChange}
              />
              <label
                htmlFor="confirmPassword"
                className={confirmPassword.length ? "shrink" : ""}
              >
                confirm password
              </label>
            </div>
          ) : (
            <div></div>
          )}
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
