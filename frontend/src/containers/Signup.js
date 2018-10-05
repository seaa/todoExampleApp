import React, { Component } from "react";
import SignupForm from "../components/auth/SignupForm";

/*
* Except for the API call, this component behaves exacly like the Login component
* eventually we'll' want to have different business logic and information
* between the Login and Signup flows
*/
export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  validateForm(username, password) {
    return (username && username.length > 0) && (password && password.length > 0);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  async handleSubmit(submitEvent) {
    let data = {
      username: this.state.username,
      password: this.state.password
    };

    submitEvent.preventDefault();

    let handleErrors = response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    fetch('http://localhost:8000/core/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      if (json.username && json.token) {
        this.props.userHasAuthenticated(true, json.username, json.token);
        this.props.history.push("/");
      }
    })
    .catch(error => alert(error));
  }

  render() {
    return (
      <SignupForm
        username={this.state.username}
        password={this.state.password}
        handleChangeUsername={e => this.handleChange(e)}
        handleChangePassword={e => this.handleChange(e)}
        handleSubmit={e => this.handleSubmit(e)}
        validate={this.validateForm}
      />
    );
  }
}
