import React, { Component, PropTypes } from 'react';
import Axios from 'axios';
import Chip from 'material-ui/Chip';
import GridList from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

import RaisedButton from 'material-ui/RaisedButton';
import {cyan100, cyanA700 } from 'material-ui/styles/colors';

// Recover the different components
import CreateProject from './CreateProject/CreateProject';
import UpdateProject from './UpdateProject/UpdateProject';

export default class ManageProject extends Component {

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
    requestUpdateProject: null,
  }

  // Recover all the projects in database
  getProjects = () => {
    this.axios.get('https://markal.servehttp.com/dashboard/admin/projects')
      .then((response) => {
        console.log("Projects", response.data);
        this.setState({projects: response.data});
      })
      .catch((error) => {
        console.error(error);
      })
  }

  // Delete the project selected
  handleRequestDeleteProjects = (project) => {
    this.axios.delete("https://markal.servehttp.com/dashboard/admin/projects/" + project.id)
      .then((response) => {
        this.getProjects();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleRequestDeleteAllProjects = () => {
    // recover the length of projects
    let length = this.state.projects.length;
    this.state.projects.forEach((project, index) => {
      this.axios.delete("https://markal.servehttp.com/dashboard/admin/projects/" + project.id)
        .then((response) => {
          // Verify if the length is small than the index
          if(length <= index + 1){
            this.getProjects()
          }
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  // Create a project
  handleCreateProject = () => {
    this.getProjects();
  }

  // Edit and update a project
  handleUpdateProject = () => {
    this.setState({requestUpdateProject: null});
    this.getProjects();
  }

  handleRequestUpdate = (project) => {
    this.setState({requestUpdateProject: project});
  }

  render() {
    const chip = {
      margin: 4,
    };

    // Display the projects for the current user and the avatar
    let projects = this.state.projects.map((project, index) => (
      <Chip
        style={chip}
        backgroundColor={cyan100}
        onRequestDelete={this.handleRequestDeleteProjects.bind(null, project)}
        onTouchTap={this.handleRequestUpdate.bind(null, project)}
      >
        <Avatar
          backgroundColor={cyanA700}>
          {project.user.username.substring(0,2).toUpperCase()}
        </Avatar>
        {project.title}
      </Chip>
    ));

    if (projects.length < 1) {
      projects = (
        <p>Aucun projet disponnible</p>
      );
    }

    // Display the form to edit and update a project
    let updateProject = '';
    if (this.state.requestUpdateProject) {
      updateProject = (
        <UpdateProject
          auth_jwt={this.props.auth_jwt}
          project={this.state.requestUpdateProject}
          handleRefreshProjectList={this.handleUpdateProject}
        />
      );
    }

    return(
      <div>
        <Subheader>Panel de gestion de projet</Subheader>
        {/* Display the form to create a project */}
        <CreateProject
          auth_jwt={this.props.auth_jwt}
          handleRefreshProjectList={this.handleCreateProject}
        />
        <div>
          <h2>Administration des projects</h2>
          {/* Display the projects for the current user and the avatar */}
          <div>
            {projects}
          </div>
          <div>
            <RaisedButton
              label="Supprimer tous les projets"
              primary={true}
              onClick={this.handleRequestDeleteAllProjects}
            />
          </div>
        </div>
        {/* Display the form to edit and update a project */}
        {updateProject}
      </div>
    );
  }
}
