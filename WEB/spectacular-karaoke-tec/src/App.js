import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';

import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


import NavBar from "./components/navbar.component"


export default class App extends Component {
      
      render() {
        return (<Router>
          <div className="App">
            <body>
              <NavBar/>
            </body>
          </div></Router> 
  );
}
}
