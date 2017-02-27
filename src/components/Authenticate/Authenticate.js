import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Axios from 'axios';

export default class Authenticate extends Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    login: '',
    password: '',
    isMissing: false,
  };

  getToken(data) {
    Axios.post('http://localhost:3000/authenticate', {
      'email': data.login,
      'password': data.password
    })
      .then(function (response){
        console.log(response);
      })
      .catch(function (error){
        console.error(error);
      })
  }

  onSubmit(e) {
    console.log(this.login);
    e.preventDefault();

    /* Test case if require field is filled */
    let error = false;
    let isMissing = false;
    if (!this.login.input.value) {
      error = true;
      isMissing = true;
    }
    if (!this.password.input.value) {
      error = true;
      isMissing = true;
    }

    const data = {
      login: this.login.input.value,
      password: this.password.input.value,
      isMissing,
    };

    this.setState(data);

    if (!isMissing){
      this.getToken(data);
    }
  }

  render() {
    const style = {
      margin: 12,
    };
    let error = '';
    if (this.state.isMissing){
      error = (<p>Error</p>);
    }
    return (
      <div>
        <h2>Formulaire de connexion</h2>
        <form onSubmit={this.onSubmit}>
          <TextField
            hintText="Login"
            floatingLabelText="Login"
            ref={(login) => { this.login = login; }}
          /><br />
          <TextField
            hintText="Mot de passe"
            floatingLabelText="Mot de passe"
            type="password"
            ref={(password) => { this.password = password; }}
          /><br />
          {error}
          <RaisedButton
            type="submit"
            label="Connexion"
            style={style} />
        </form>
      </div>
    );
  }
}
