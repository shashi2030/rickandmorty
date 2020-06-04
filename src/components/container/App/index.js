import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from '../Login';
import Register from '../Register';
import AuthRoute from '../../presentation/AuthRoute/AuthRoute';
import Home from '../Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <AuthRoute path="/home" exact component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default App;
