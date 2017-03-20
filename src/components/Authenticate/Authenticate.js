import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {cyan700} from 'material-ui/styles/colors';

export default class Authenticate extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    login: '',
    password: '',
    isMissing: false,
  };

  onSubmit(e) {
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
      this.props.onSubmit(data);
    }
  }

  render() {
    const style = {
      margin: 12,
    };

    let error = '';

    if (this.state.isMissing){
      error = (<p>Email ou mot de passe incorrect</p>);
    }
    return (
      <div>
        <h2>Formulaire de connexion</h2>
        <form onSubmit={this.onSubmit}>
          <TextField
            floatingLabelText="Email"
            ref={(login) => { this.login = login; }}
          /><br />
          <TextField
            floatingLabelText="Mot de passe"
            type="password"
            ref={(password) => { this.password = password; }}
          /><br />
          {error}
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
