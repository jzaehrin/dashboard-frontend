import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Toggle from 'material-ui/Toggle';
import Axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

import {cyan100} from 'material-ui/styles/colors';

export default class App extends Component {

  static propTypes = {
    auth_jwt: PropTypes.string.isRequired,
  }

  constructor(props) {
    super();

    this.axios = Axios.create({
      headers: {'Authorization' : props.auth_jwt}
    });
  }

  componentWillMount() {
    this.getProjectManager("");
  }

  state = {
    users: [],
  }

  getProjectManager(){
    this.axios.get('http://localhost:3000/admin/users')
      .then((response) => {
        console.log("Users", response.data);
        this.setState({users: response.data});
      })
      .catch((error) => {
        console.error(error);
      })
  }

  handleAddUser = () => {
    console.log(this.isAdmin);
    this.axios.post("http://localhost:3000/admin/users", {
      user: {
        username: this.username.input.value,
        email: this.email.input.value,
        password: this.password.input.value,
        is_admin: this.isAdmin.state.switched,
      }
    })
      .then((response) => {
        this.getProjectManager();
      })
      .catch((error) => {
        console.error(error);
      })
  }

  handleRequestDelete = (user) => {
    this.axios.delete("http://localhost:3000/admin/users/" + user.id)
      .then((response) => {
        this.getProjectManager();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    let users = this.state.users.map((user, index) => (
      <Chip
        onRequestDelete={this.handleRequestDelete.bind(null, user)}
      >{user.username} -- {user.email}</Chip>
    ));

    return (
      <div>
        <h2>Créer un chef de projet</h2>
        <TextField
          floatingLabelText="Username"
          ref={(username) => this.username = username}
        /><br />
        <TextField
          floatingLabelText="Email"
          ref={(email) => this.email = email}
        /><br />
        <TextField
          floatingLabelText="Mot de passe"
          type="password"
          ref={(password) => this.password = password}
        /><br />
        <Toggle
          label="Admin"
          ref={(isAdmin) => this.isAdmin = isAdmin}
        /><br />
        <RaisedButton
          label="Add"
          primary={true}
          onClick={this.handleAddUser}
        />

        <h2>Supprimer un chef de projet</h2>
        {users}
      </div>
    );
  }
}
