import React, { Component } from 'react';
import NavBar from './components/Nav';
import Routes from './Routes';
import './App.css';

import { httpRequest } from './services/httpService';

/// "un-reduxed" component, this ideally should be a container, with its own .ducks file
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      isAuthenticated: localStorage.getItem('token') ? true : false
    };
  }

  // is a user logged in? we should get his data
  async componentDidMount() {
    if (this.state.isAuthenticated) {
      try {
        // await "holds" the execution until the async function completes
        // note that we import the base method httpRequest from httpService
        // (intead od defining a new funcion "getTodos" or something in the actual service, like we did
        // for login and signup). This is just to show that we can use it.
        const userFetch = await httpRequest({
          method: 'GET',
          service: 'core/current_user/',
        });
        if (userFetch.username) {
          this.setState({ username: userFetch.username });
        }
      } catch (error) {
        alert(error);
        this.handleLogout();
      }
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

  // App just loads the navbar (that we could remove)
  // and the Routes component, that defines the logic to move between pages
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
