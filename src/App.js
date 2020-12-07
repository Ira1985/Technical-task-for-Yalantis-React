import React, { Component, lazy, Suspense } from 'react';
import './App.css';
import {Router, Switch, Route, Redirect} from "react-router-dom";
import { createBrowserHistory } from "history";

import Users from "./components/Users";

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
        <Router history={history}>
          <Switch>
            <Route exact path="/employees" name="Працівники" component={Users} />
            <Redirect from='/' to='/employees'/>
          </Switch>
        </Router>
    );
  }
}

export default App;
