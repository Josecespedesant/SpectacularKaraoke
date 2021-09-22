import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Logout extends Component {

  logout() {
    this.props.history.push('/');
    this.props.keycloak.logout();
  }

  render() {
    return (
      <li><button type="submit" className="dropdown-item btn btn-primary btn-block" onClick={ () => this.logout() }>
      Logout
    </button></li>
      
    );
  }
}
export default withRouter(Logout);