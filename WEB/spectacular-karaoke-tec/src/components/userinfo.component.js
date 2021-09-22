import React, { Component } from 'react';

class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      id: "",
      premium:""
    };
    this.props.keycloak.loadUserProfile().then(userProfile => {
      this.setState({username: userProfile.firstName +' ' + userProfile.lastName, email: userProfile.email, id: userProfile.id, premium: userProfile.attributes.premium[0]});
  });
  }

  render() {
    return (
      
      <div className="UserInfo">
        <li><a class="dropdown-item disabled">Name: {this.state.username}</a></li>
        <li><a class="dropdown-item disabled">Email: {this.state.email}</a></li>
        <li><a class="dropdown-item disabled">ID: {this.state.id}</a></li>
        <li><a class="dropdown-item disabled">Premium?: {this.state.premium}</a></li>
        <li><hr class="dropdown-divider" /></li>
      </div>
    );
  }
}
export default UserInfo;