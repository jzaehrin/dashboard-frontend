import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import {cyan100} from 'material-ui/styles/colors';

export default class App extends Component {
  render() {
    const style = {
      margin: 12,
    };
    const chip = {
        margin: 4,
    };
    function handleRequestDelete() {
      alert('You clicked the delete button.');
    }

    return (
      <div>
        <h2>Créer un chef de projet</h2>
        <TextField
          floatingLabelText="Email"
        /><br />
        <TextField
          floatingLabelText="Mot de passe"
          type="password"
        /><br />
        <h2>Supprimer un chef de projet</h2>
        <Chip
          backgroundColor={cyan100}
          onRequestDelete={handleRequestDelete}
          style={chip}
        >
          Nom du chef de projet
        </Chip>
      </div>
    );
  }
}
