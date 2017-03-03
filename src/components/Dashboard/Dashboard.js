import React, { Component } from 'react';
import GridList from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Axios from 'axios';

import Project from '../Project';

export default class Dashboard extends Component {
  constructor() {
    super();

    this.getProject = this.getProject.bind(this);
  }

  componentWillMount() {
    this.getProject();
  }

  state = {
    projects: [],
    filter: [],
  };

  getProject() {
    Axios.get('http://localhost:3000/projects')
      .then((response) => {
        this.setState({ projects: response.data });
      })
      .catch((error) => {
        console.error(error);
      })
  }

  render() {
    let projects = [];

    this.state.projects.map((project) => {
      projects.add((<Project data={project} />));
    });

    return (
      <GridList
        cellHeight={300}
      >
        <Subheader>Projects</Subheader>
        {projects}
      </GridList>
    );
  }
}
