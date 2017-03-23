import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Toggle from 'material-ui/Toggle';
import Axios from 'axios';
import JwtDecode from 'jwt-decode';
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
    error: {
      create: false,
    },
  }

  getProjectManager(){
    this.axios.get('https://markal.servehttp.com/dashboard/admin/users')
      .then((response) => {
        console.log("Users", response.data[1]);
        this.setState({users: response.data});
      })
      .catch((error) => {
        console.error(error);
      })
  }

  createProjectManager = (e) => {
    e.preventDefault();
    let username = this.username.input.value;
    let email = this.email.input.value;

    if (!username ||
        !email ||
        !this.password.input.value)
    {
      this.setState({error: {
        create: true
      }});
    }
    else if(this.state.users.filter(u => u.username === username).length > 0 ){
      this.setState({error: {
        create: true,
        username_message: "Ce Username existe déjà",
      }});
    }
    else if(this.state.users.filter(u => u.email  === email).length > 0 ){
      this.setState({error: {
        create: true,
        email_message: "Cette email existe déjà",
      }});
    }
    else
    {
      this.axios.post("https://markal.servehttp.com/dashboard/admin/users", {
        user: {
          username: this.username.input.value,
          email: this.email.input.value,
          password: this.password.input.value,
          is_admin: this.isAdmin.state.switched,
        }
      })
        .then((response) => {
          this.email.input.value = "";
          this.username.input.value = "";
          this.password.input.value = "";
          this.setState({error: {
            create: false
          }});

          this.getProjectManager();
        })
        .catch((error) => {
          console.error("Create Project Manager Error :", error);
          this.setState({error: {
            create: true,
            sending_message: "Unable to create User",
          }});
        })
    }
  }

  handleDeleteProjectManager = (user) => {
    this.axios.delete("https://markal.servehttp.com/dashboard/admin/users/" + user.id)
      .then((response) => {
        this.getProjectManager();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    console.log(this.state);
    let error = this.state.error.create;

    let users = this.state.users.map((user, index) => (
      <Chip
        onRequestDelete={
          (user.id == JwtDecode(this.props.auth_jwt).user_id) ?
            null:
            this.handleDeleteProjectManager.bind(null, user)
        }
        backgroundColor={user.is_admin ? cyan100: ""}
      >{user.username} -- {user.email}</Chip>
    ));

    let error_message = ""
    if (error && this.state.error.message) {
      error_message = (<p>{this.state.error.message}</p>);
    }

    let username_error = ""
    if (error) {
      if (this.state.error.username_message) {
        username_error = this.state.error.username_message;
        this.state.error.username_message = "";
      } else if (this.username.input.value == "") {
        username_error = "Le champ est vide";
      }
    }

    let email_error = ""
    if (error) {
      if (this.state.error.email_message) {
        email_error = this.state.error.email_message;
        this.state.error.email_message = "";
      } else if (this.email.input.value == "") {
        email_error = "Le champ est vide";
      }
    }

    return (
      <div>
        <form onSubmit={this.createProjectManager}>
          <h2>Créer un chef de projet</h2>
          <TextField
            floatingLabelText="Username"
            errorText={username_error}
            ref={(username) => this.username = username}
          /><br />
          <TextField
            floatingLabelText="Email"
            errorText={email_error}
            ref={(email) => this.email = email}
          /><br />
          <TextField
            floatingLabelText="Mot de passe"
            type="password"
            errorText={(error && this.password.input.value == "") ? "Le champ est vide": ""}
            ref={(password) => this.password = password}
          /><br />
          <Toggle
            label="Admin"
            ref={(isAdmin) => this.isAdmin = isAdmin}
          /><br />
          {error_message}
          <RaisedButton
            label="Add"
            type="submit"
            primary={true}
          />
        </form>

        <h2>Supprimer un chef de projet</h2>
        {users}
      </div>
    );
  }
}
