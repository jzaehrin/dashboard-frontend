import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default function Authenticate() {
  const style = {
    margin: 12,
  };
  return (
    <MuiThemeProvider>
      <div>
        <h2>Formulaire de connexion</h2>
        <TextField
          hintText="Login"
          floatingLabelText="Login"
        /><br />
        <TextField
          hintText="Mot de passe"
          floatingLabelText="Mot de passe"
          type="password"
        /><br />
        <RaisedButton label="Connexion" style={style} />
      </div>
    </MuiThemeProvider>
  );
}
