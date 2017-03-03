import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import Authenticate from '../Authenticate';

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

  logout(){
    localStorage.clear();
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
    const style = {
      margin: 12,
    };
    let page_login = '';
    let page_panel = '';
    if(this.isAuthenticate()){
      page_panel = (
        <form onSubmit={this.logout}>
          <RaisedButton
            type="submit"
            label="Déconnexion"
            style={style} />
        </form>
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
