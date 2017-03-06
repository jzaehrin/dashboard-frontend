import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {cyan100} from 'material-ui/styles/colors';


export default class App extends Component {
  render() {
    const style = {
      marginRight: 20,
    };

    return (
      <div>
        <h2>Créer un projet</h2>
        <TextField
          floatingLabelText="Titre"
        /><br />
        <TextField
          floatingLabelText="Courte description / objectifs"
          multiLine={true}
        /><br />
        <DatePicker
          hintText="Date d'échéance"
          mode="landscape" />
        <TextField
          hintText="En cours, Terminé,En attente"
          floatingLabelText="Statut"
        /><br />
        <TextField
          floatingLabelText="Tags"
        />
        <FloatingActionButton
          backgroundColor={cyan100}
          mini={true}
          style={style}>
          <ContentAdd />
        </FloatingActionButton><br />
        <h2>Modifier un projet</h2>
        <TextField
          floatingLabelText="Titre"
        /><br />
        <TextField
          floatingLabelText="Courte description / objectifs"
          multiLine={true}
        /><br />
        <DatePicker
          hintText="Date d'échéance"
          mode="landscape" />
        <TextField
          floatingLabelText="Statut"
        /><br />
        <TextField
          floatingLabelText="Tags"
        />
      </div>
    );
  }
}
