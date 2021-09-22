import React, { Component } from "react";
import Keycloak from 'keycloak-js';
import Logout from "./logout.component";
import UserInfo from "./userinfo.component";
import { useCookies } from 'react-cookie';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: false };
    }

    componentDidMount() {
        const keycloak = Keycloak('/keycloak.json');
        keycloak.init({onLoad: 'login-required'}).then(authenticated => {
          this.setState({ keycloak: keycloak, authenticated: authenticated })
        })
    }
    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) return (
              <div>
                  
                  <li class="dropdown-item">User Logged In</li>
                <UserInfo keycloak={this.state.keycloak} />
                <Logout keycloak={this.state.keycloak} />
              </div>
            ); else return (<div>Unable to authenticate!</div>)
          }
          return (
            <div>Initializing Keycloak...</div>
          );
        }
}