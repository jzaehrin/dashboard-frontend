import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {cyan700} from 'material-ui/styles/colors';

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

  getToken(data) {
    Axios.post('http://localhost:3000/authenticate', {
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
        console.error(error);
      })
  }

  onSubmitCredential(data){
    this.getToken(data)
  }

  logout = () => {
    localStorage.clear();
    this.forceUpdate();
  }

  isAuthenticate(){
    let token = localStorage.getItem('x-access-token');

    if(token){
      return true;
    }else{
      return false;
    }
  }
  
  render(){

    let page_login = '';
    let page_panel = '';

    if(this.isAuthenticate()){
      let auth_jwt = localStorage.getItem('x-access-token');
      console.log("JWT Token", auth_jwt);
      page_panel = (
        <div>
          <ManageUser
            auth_jwt={auth_jwt}
          />
          <ManageProject
            auth_jwt={auth_jwt}
          /><br />
          <RaisedButton
            backgroundColor={cyan700}
            type="submit"
            label="Déconnexion"
            onClick={this.logout}
          />
        </div>
      );
    }else{
      page_login = (
        <Authenticate onSubmit={this.onSubmitCredential}/>
      );
    }

    return(
      <div>
        {page_login}
        {page_panel}
      </div>
    )
  }
}
