import React, { Component } from "react";
import NavBar from "./components/routing/Nav";
import Routes from "./Routes";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      isAuthenticated: localStorage.getItem('token') ? true : false
    };
  }

  // is a user logged in? we should get his data
  componentDidMount() {
    if (this.state.isAuthenticated) {

      // this error handler code repeats on each fetch call
      // good idea: refactor this out from here, into a service
      // even better idea: refactor all of the API handling into its own service
      let handleErrors = response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      }

      // fetch returns Promise object
      // we chain error handling first
      // ussualy this should be done with .catch
      // but fetch works differently
      fetch('http://localhost:8000/core/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        if (json.username) {
          this.setState({ username: json.username });
        }
      })
      .catch(error => {
        alert(error);
        this.handleLogout();
      });
    }
  }

  // updates the main state
  userHasAuthenticated = (authenticated, username, token) => {
    this.setState({
      isAuthenticated: authenticated,
      username: username
    });
    localStorage.setItem('token', token);
  }

  // for our app, to be "logged out" is to remove the token
  handleLogout = () => {
    this.setState({
      isAuthenticated: false,
      username: ''
    });
    localStorage.removeItem('token');
  }

  render() {
    const childProps = {
      username: this.state.username,
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
      <div className="App">
        <NavBar
          isAuthenticated={this.state.isAuthenticated}
          username={this.state.username}
          handleLogout={this.handleLogout}
        />
        <Routes childProps={childProps}/>
      </div>
    );
  }
}

export default App;
