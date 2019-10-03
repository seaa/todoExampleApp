import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import NotFound from './components/NotFound';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';

// we use custom 'route' components (instead of Route)
// to pass auth logic to different routes
// read the docs for react-router
export default ({ childProps }) =>
  <Switch>
    <AuthenticatedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <Route component={NotFound} />
</Switch>;
