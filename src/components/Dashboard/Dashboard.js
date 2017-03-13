import React, { Component } from 'react';
import GridList from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Axios from 'axios';
import moment from 'moment';

import Project from '../Project';
import Filter from '../Filter';
import ProjectDetails from '../ProjectDetails';

export default class Dashboard extends Component {
  constructor() {
    super();

    this.getProjects = this.getProjects.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.filterScoop = this.filterScoop.bind(this);
  }

  componentWillMount() {
    this.getProjects("");
  }

  state = {
    projects: [],
    filter: [],
  };

  getProjects(search) {
    if (search) {
      Axios.get('http://localhost:3000/projects/search', {
          params: {
            string: search
          }
        })
        .then((response) => {
          this.setState({projects: response.data});
        })
        .catch((error) => {
          console.error(error);
        })
    } else {
      Axios.get('http://localhost:3000/projects')
        .then((response) => {
          this.setState({projects: response.data});
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }

  handleDetails(projects) {
    this.setState({ details_project: projects });
  }

  handleTagsChange = (filterTags) => {
    this.setState({filterTags});
  }

  handleStatusChange = (filtredStatus) => {
    this.setState({filtredStatus});
  };

  handleDateTypeChange = (filtredDateType) => {
    this.setState({filtredDateType});
  }

  handleDatePickerChange = (filteredDate) => {
    this.setState({filteredDate});
  }

  handleSearch = (search) => {
    this.getProjects(search);
    this.setState({search});
  }

  filterScoop(project) {
    let scoop = true;

    if (this.state.filtredStatus) {
      if (project.status != this.state.filtredStatus)
        scoop = false;
    }

    if (scoop && this.state.filtredDateType && this.state.filteredDate) {
      let filteredDate = moment(this.state.filteredDate);
      let projectDate = moment(project.deadline);

      if (this.state.filtredDateType < 0 && projectDate.diff(filteredDate) >= 0) {
        scoop = false;
      } else if (this.state.filtredDateType > 0 && filteredDate.diff(projectDate) >= 0) {
        scoop = false;
      }
    }

    if (scoop && this.state.filterTags) {
      this.state.filterTags.map((tag, index) => {
        if (scoop) {
          let regex = new RegExp(tag, "i");

          if (project.tags.search(regex) === -1) {
            scoop = false;
          }
        }
      })
    }

    return scoop;
  }

  render() {
    let projects = [];

    this.state.projects.map((project) => {
      if (this.filterScoop(project)) {
        projects.push((<Project data={project} handleDetails={this.handleDetails} />));
      }
    });

    let message = '';
    if (this.state.search) {
      message = (<p>{projects.length} projects was found</p>)
    }

    if (projects.length < 1) {
      if (!this.state.search) {
        message = (<p>0 projects in the database, if you are a project manager, go to the admin panel for register once</p>)
      }
    }

    let project_details = '';
    if(this.state.details_project){
      project_details = (<ProjectDetails data={this.state.details_project} />);
    }

    return (
      <div>
        {project_details}
        <Filter
          ref={(filter) => this.filter = filter}
          handleStatusChange={this.handleStatusChange}
          handleDatePickerChange={this.handleDatePickerChange}
          handleDateTypeChange={this.handleDateTypeChange}
          handleTagsChange={this.handleTagsChange}
          handleSearch = {this.handleSearch}
        />
        {message}
        <GridList
          cols={3}
          cellHeight={175}
        >
          <Subheader>Projects</Subheader>
          {projects}

        </GridList>
      </div>
    );
  }
}
