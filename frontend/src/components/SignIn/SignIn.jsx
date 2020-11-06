import React from "react";
import "./SignIn.scss";
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";

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
    this.props.location.pathname === "/signin"
      ? fetch("http://localhost:5000/signin", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...this.state,
          }),
        })
          .then((resp) => resp.json())
          .then((user) => {
            if (user) {
              this.props.loadUser(user);
              this.props.history.push("/");
            }
          })
      : this.state.password === this.state.confirmPassword
      ? fetch("http://localhost:5000/register", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...this.state,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.name) {
              console.log(data.name);
              this.props.loadUser(data);
              this.props.history.push("/");
            } else {
              alert(data);
            }
          })
      : alert("password does not match");
  };

  render() {
    const { name, email, password, confirmPassword } = this.state;
    const { pathname } = this.props.location;
    return (
      <div className="container">
        <form
          method="post"
          action=""
          className="container__form"
          onSubmit={this.handleSubmit}
        >
          {pathname === "/signup" ? <h1>Sign Up</h1> : <h1>Sign In</h1>}
          {pathname === "/signup" ? (
            <div className="center nameField">
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={this.handleChange}
                required
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
              required
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
              required
            />
            <label
              htmlFor="password"
              className={password.length ? "shrink" : ""}
            >
              password
            </label>
          </div>
          {pathname === "/signup" ? (
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

export default withRouter(SignIn);
