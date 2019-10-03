import React, { Component } from "react";
import { connect } from 'react-redux';
import * as actions from './Home.ducks';
import TodoList from '../../components/TodoList/TodoList';
import './Home.css';

import { httpRequest } from '../../services/httpService';

// we need to define the parts of the store that we wnt as props
const mapStateToProps = state => ({
  todos: state.Home.todos
})

class Home extends Component {

  // when te component gets mounted (before the first render)
  // we get the to-do list from the API
  async componentDidMount() {

    // httpService adds the auth header with our token by default
    try {
      // await "holds" the execution until the async function completes
      const todosResponse = await httpRequest({
        method: 'GET',
        service: 'api/',
      });
      this.props.fetchTodosSucceeded(todosResponse);
    } catch (error) {
      alert(error)
    }
  }

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <TodoList
            data={this.props.todos}
          />
        </div>
      </div>
    );
  }
}

// we dont use mapDispatchToProps as we are passing along all the action creators to connect
// const mapDispatchToProps = dispatch => ({
//   ...
// })

export default connect(
  mapStateToProps,
  actions
)(Home);
