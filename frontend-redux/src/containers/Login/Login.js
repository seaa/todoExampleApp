import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from './Login.ducks';
import LoginForm from '../../components/LoginForm';

import { login } from '../../services/httpService';

// we need to define the parts of the store that we wnt as props
const mapStateToProps = state => ({
  username: state.Login.username,
  password: state.Login.password
});

class Login extends Component {

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  validateForm(username, password) {
    return (username && username.length > 0) && (password && password.length > 0);
  }

  handleChange = event => {
    if (event.target.id === 'username') {
      this.props.setUsername(event.target.value);
    }
    if (event.target.id === 'password') {
      this.props.setPassword(event.target.value);
    }
  }

  async handleSubmit(submitEvent) {
    submitEvent.preventDefault();

    try {
      // await "holds" the execution until the async function completes
      const loginResponse = await login({ username: this.props.username, password: this.props.password });
      if (loginResponse.user && loginResponse.user.username && loginResponse.token) {
        this.props.userHasAuthenticated(true, loginResponse.user.username, loginResponse.token);
        this.props.history.push("/");
      }
    } catch (error) {
      alert(error)
    }
  }

  render() {
    return (
      <LoginForm
        username={this.props.username}
        password={this.props.password}
        handleChangeUsername={e => this.handleChange(e)}
        handleChangePassword={e => this.handleChange(e)}
        handleSubmit={e => this.handleSubmit(e)}
        validate={this.validateForm}
      />
    );
  }
};

export default connect(
  mapStateToProps,
  actions
)(Login);
