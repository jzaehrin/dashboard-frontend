import React, { Component, PropTypes } from 'react';
import Axios from 'axios';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import {cyan50, cyan100, cyanA700 } from 'material-ui/styles/colors';

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
    this.getProjects("");
  }

  state = {
    title: '',
    shortDescription: '',
    date: '',
    status: '',
    nbrPeople: '',
    projects: [],
    tags: [],
    statusValue: [],
    create_error: false,
  }

  getProjects(){
    this.axios.get('http://localhost:3000/admin/projects')
      .then((response) => {
        console.log("Projects", response.data);
        this.setState({projects: response.data});
      })
      .catch((error) => {
        console.error(error);
      })
  }

  handleRequestDeleteTags = (tag) => {
    this.setState(s => {
      return {tags: [...s.tags.filter(t => t !== tag)]}
    });
  }

  handleAddTag = (event) => {
    event.preventDefault();

    if (this.tagField.input.value) {
      this.setState(s => ({
        tags: [...s.tags, this.tagField.input.value]
      }), () => {
        this.tagField.input.value = ''
      });
    }
  }

  handleStatusChange = (event, index, statusValue) => {
    let selectedStatus = '';

    switch (statusValue) {
      case 0:
        statusValue = '';
        break;
      case 1:
        selectedStatus = 'in_progress';
        break;
      case 2:
        selectedStatus = 'canceled';
        break;
      case 3:
        selectedStatus = 'finished';
        break;
      default:
        statusValue = '';
        break;
    }
    this.setState({statusValue, selectedStatus});
  }

  createProject = (e) => {
    e.preventDefault();

    /* Test case if require field is filled */
    let error = false;

    if (!this.title.input.value) {
      error = true;
    }
    if (!this.shortDescription.input.refs.input.value) {
      error = true;
    }
    if (!this.date.state.date) {
      error = true;
    }
    if (!this.state.statusValue) {
      error = true;
    }
    if (!this.tags) {
      error = true;
    }
    if (!this.nbrPeople.input.value) {
      error = true;
    }

    if(error){
      this.setState({create_error: true});
    } else {
      this.axios.post("http://localhost:3000/admin/projects", {
        project: {
          title: this.title.input.value,
          short_description: this.shortDescription.input.refs.input.value,
          status: this.state.selectedStatus,
          deadline: moment(this.date.state.date).format("YYYY-MM-DD"),
          tags: this.state.tags.join(', '),
          nbr_people: this.nbrPeople.input.value,
        }
      })
        .then((response) => {
          this.title.input.value = "";
          this.shortDescription.input.refs.input.value = "";
          this.nbrPeople.input.value = "";
          this.setState({statusValue: 0, selectedStatus: "", tags: [], create_error: false});

          this.getProjects();
        })
        .catch((error) => {
          this.setState({create_error: true});
          console.error(error);
        })
    }
  }

  handleRequestDeleteProjects = (project) => {
    this.axios.delete("http://localhost:3000/admin/projects/" + project.id)
      .then((response) => {
        this.getProjects();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const style = {
      marginRight: 20,
    };
    const chip = {
      margin: 4,
    }
    let projects = this.state.projects.map((project, index) => (
      <Chip
        style={chip}
        backgroundColor={cyan100}
        onRequestDelete={this.handleRequestDeleteProjects.bind(null, project)}
      >
        <Avatar
          backgroundColor={cyanA700}>
          {project.user.username.substring(0,2).toUpperCase()}
        </Avatar>
        {project.title}
      </Chip>
    ));

    let tags = this.state.tags.map((tag, index) => (
      <Chip
        backgroundColor={cyanA700}
        onRequestDelete={this.handleRequestDeleteTags.bind(null, tag)}
      >{tag}</Chip>
    ));

    return (
      <div>
        <h2>Supprimer un project</h2>
        {projects}
        <br />
        <h2>Créer un projet</h2>
        <form onSubmit={this.createProject}>
          <TextField
            floatingLabelText="Titre"
            errorText={(this.state.create_error && this.title.input.value == "") ? "Le champ est vide": ""}
            ref={(title) => { this.title = title; }}
          /><br />
          <TextField
            floatingLabelText="Courte description / objectifs"
            multiLine={true}
            errorText={(this.state.create_error && this.shortDescription.input.refs.input.value == "") ? "Le champ est vide": ""}
            ref={(shortDescription) => { this.shortDescription = shortDescription; }}
          /><br />
          <SelectField
            floatingLabelText="Status"
            value={this.state.statusValue}
            errorText={(this.state.create_error && this.state.statusValue == "") ? "Sélectionnez une valeur": ""}
            onChange={this.handleStatusChange}
          >
            <MenuItem value={0} primaryText="<None>" />
            <MenuItem value={1} primaryText="In progress" />
            <MenuItem value={2} primaryText="Canceled" />
            <MenuItem value={3} primaryText="Finish" />
          </SelectField>
          <br />
          <DatePicker
            hintText="Date d'échéance"
            mode="landscape"
            ref={(date) => { this.date = date; }}
          />
          <TextField
            floatingLabelText="Tags"
            errorText={(this.state.create_error && this.state.tags == "") ? "Ajoutez au moins une tag": ""}
            ref={(tagField) => { this.tagField = tagField; }}
          />
          <RaisedButton
            label="Add"
            primary={true}
            onClick={this.handleAddTag} />
          <div>
            {tags}
          </div><br />
          <TextField
            floatingLabelText="Nombre de personnes"
            errorText={(this.state.create_error && this.nbrPeople.input.value == "") ? "Le champ est vide": ""}
            ref={(nbrPeople) => { this.nbrPeople = nbrPeople; }}
          /><br />
          <RaisedButton
            backgroundColor={cyan50}
            type="submit"
            label="Créer"
            style={style} />
        </form>

        <h2>Modifier un projet</h2>
        <form onSubmit={this.editProject}>
          <TextField
            floatingLabelText="Titre"
          /><br />
          <TextField
            floatingLabelText="Courte description / objectifs"
            multiLine={true}
          /><br />
          <SelectField
            floatingLabelText="Status"
            value={this.state.statusValue}
            onChange={this.handleStatusChange}
          >
            <MenuItem value={0} primaryText="<None>" />
            <MenuItem value={1} primaryText="In progress" />
            <MenuItem value={2} primaryText="Canceled" />
            <MenuItem value={3} primaryText="Finish" />
          </SelectField>
          <br />
          <DatePicker
            hintText="Date d'échéance"
            mode="landscape" />
          <TextField
            floatingLabelText="Tags"
          /><br />
          <TextField
            floatingLabelText="Nombre de personnes"
          /><br />
          <RaisedButton
            backgroundColor={cyan50}
            type="submit"
            label="Éditer"
            style={style} />
        </form>
      </div>
    );
  }
}
