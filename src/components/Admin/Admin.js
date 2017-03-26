import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {cyan700} from 'material-ui/styles/colors';
import JwtDecode from 'jwt-decode';
import Moment from 'moment';
import Authenticate from '../Authenticate';
import ManageProject from '../Admin/ManageProject';
import ManageUser from '../Admin/ManageUser';

import Axios from 'axios';

export default class Admin extends Component {
  constructor() {
    super();

    this.onSubmitCredential = this.onSubmitCredential.bind(this);
    this.getToken = this.getToken.bind(this);
    this.isAuthenticate = this.isAuthenticate.bind(this);
  }

  state = {
    auth_error: ""
  };

  // Get JWT
  getToken(data) {
    Axios.post('https://markal.servehttp.com/dashboard/authenticate', {
      'email': data.login,
      'password': data.password
    })
      .then((response) =>{
        console.log(response);
        localStorage.setItem('x-access-token', response.data.auth_token);
        this.setState({
          auth_token:response.data.auth_token
        });
      })
      .catch((error) =>{
        console.error("Authentification Error:", error);
        this.setState({
          auth_error: "Email ou Mot de passe incorrect !"
        });
      })
  }

  onSubmitCredential(data){
    this.getToken(data)
  }

  // Logout the user and clear the local storage
  logout = () => {
    localStorage.clear();
    this.forceUpdate();
  }

  // Verify if the token is valid
  isAuthenticate(){
    let token = localStorage.getItem('x-access-token');

    if(token) {
      var timestamp = Moment().format("X");
      var decoded = JwtDecode(token);

      if (timestamp < decoded.exp) {
        return true;
      } else {
        localStorage.removeItem('x-access-token');
        return false;
      }
    }
    else {
      return false
    }
  }
  
  render(){

    let page_login = '';
    let page_panel = '';

    // If the user is connected, display the different panels
    if(this.isAuthenticate()){
      let auth_jwt = localStorage.getItem('x-access-token');
      console.log(JwtDecode(auth_jwt));

      // Display the panel to create and delete users if the authenticate user is admin
      let admin_panel = '';
      if (JwtDecode(auth_jwt).is_admin) {
        admin_panel = (
          <ManageUser
            auth_jwt={auth_jwt}
          />
       );
      }

      // Display the panel to create, delete and update projects
      page_panel = (
        <div>
          <RaisedButton
            backgroundColor={cyan700}
            type="submit"
            label="Déconnexion"
            onClick={this.logout}
          />
          {admin_panel}
          <ManageProject
            auth_jwt={auth_jwt}
          />
        </div>
      );
    }
    // If the user isn't connected, display the panel for the authentication
    else{
      page_login = (
        <Authenticate
          onSubmit={this.onSubmitCredential}
          loginError={(this.state.auth_error) ? this.state.auth_error : null}
        />
      );
    }

    return(
      // Display the different panel
      <div>
        {page_login}
        {page_panel}
      </div>
    )
  }
}
