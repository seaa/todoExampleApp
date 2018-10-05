import React, { Component } from "react";
import TodoList from "../components/todos/TodoList";
import "./Home.css";

export default class Home extends Component {
  state = {
    todos: []
  };

  // when te component gets mounted (before the first render)
  // we get the to-do list from the API
  componentDidMount() {
    let handleErrors = response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }

    // we need to add the auth header with our token
    fetch('http://localhost:8000/api/', {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      this.setState({
        todos: json
      });
    })
    .catch(error => alert(error));
}

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <TodoList
            data={this.state.todos}
          />
        </div>
      </div>
    );
  }
}
