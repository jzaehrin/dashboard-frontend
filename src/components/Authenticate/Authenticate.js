import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {cyan700} from 'material-ui/styles/colors';

import style from './Authenticate.less';

export default class Authenticate extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loginError: PropTypes.string,
  };

  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    login: '',
    password: '',
    error: false,
  };

  onSubmit(e) {
    e.preventDefault();

    /* Test case if require field is filled */
    let error = false;

    if (!this.login.input.value) {
      error = true;
    }
    if (!this.password.input.value) {
      error = true;
    }

    if(error) {
      this.setState({error});
    } else {
      this.setState({
        login: this.login.input.value,
        password: this.password.input.value,
        error: false
      });

      this.props.onSubmit({
        login: this.login.input.value,
        password: this.password.input.value
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loginError) {
      this.setState({loginError: nextProps.loginError});
    }
  }

  render() {
    const style = {
      margin: 12,
    };

    let error = "Le champ est vide";
    if (this.state.loginError){
      error = this.state.loginError;
      this.state.loginError = "";
      this.password.input.value = "";
    }

    return (
      <div>
        <h2>Formulaire de connexion</h2>
        <form onSubmit={this.onSubmit}>
          <TextField
            floatingLabelText="Email"
            ref={(login) => { this.login = login; }}
            errorText={(this.props.loginError || this.state.error && this.login.input.value == "") ? error : ""}
          /><br />
          <TextField
            floatingLabelText="Mot de passe"
            type="password"
            ref={(password) => { this.password = password; }}
            errorText={(this.state.error && this.password.input.value == "") ? "Le champ est vide": ""}
          /><br />
          <RaisedButton
            backgroundColor={cyan700}
            type="submit"
            label="Connexion"
            style={style} />
        </form>
      </div>
    );
  }
}
