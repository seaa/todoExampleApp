import React from "react";
import { render } from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";

import rootReducer from './reducers'

const store = createStore(rootReducer);

console.log(store.getState())

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>,
  </Provider>,
  document.getElementById('root')
);
