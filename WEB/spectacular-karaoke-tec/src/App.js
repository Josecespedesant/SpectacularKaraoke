import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login.component";
import Home from "./components/home.component"
import NavBar from "./components/navbar.component"

export default class App extends Component {
      
      render() {
        return (<Router>
          <div className="App">
            <body>
              <NavBar></NavBar>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path="/sign-in" component={Login} />
                <Route path="/home" component={Home} />

              </Switch>
            </body>
          </div></Router> 
  );
}
}
