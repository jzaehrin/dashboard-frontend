import React, { Component, PropTypes } from 'react';
import Axios from 'axios';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {cyan100, cyanA700 } from 'material-ui/styles/colors';

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

  getProjects = () => {
    this.axios.get('http://localhost:3000/admin/projects')
      .then((response) => {
        console.log("Projects", response.data);
        this.setState({projects: response.data});
      })
      .catch((error) => {
        console.error(error);
      })
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

  handleCreateProject = () => {
    this.getProjects();
  }

  handleUpdateProject = () => {
    this.setState({requestUpdateProject: null});
    this.getProjects();
  }

  handleRequestUpdate = (project) => {
    console.log("Project", project);
    this.setState({requestUpdateProject: project});
  }

  render() {
    const style = {
      marginRight: 20,
    };
    const chip = {
      margin: 4,
    };

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

    return (
      <div>
        <CreateProject
          auth_jwt={this.props.auth_jwt}
          handleRefreshProjectList={this.handleCreateProject}
        />
        <div>
          <h2>Administration des projects</h2>
          <div>
            {projects}
          </div>
        </div>
        {updateProject}
      </div>
    );
  }
}
