import { combineReducers } from 'redux';

import { default as App } from './App.ducks';
import { reducer as Home } from './containers/Home';
import { reducer as Login } from './containers/Login';
import { reducer as Signup } from './containers/Signup';

export default combineReducers({
  App,
  Home,
  Login,
  Signup,
});
