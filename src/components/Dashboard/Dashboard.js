import React, { Component } from 'react';
import GridList from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import MDCached from 'material-ui/svg-icons/action/cached';
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

  // Recover the search and all the projects
  getProjects(search) {
    if (search) {
      Axios.get('https://markal.servehttp.com/dashboard/projects/search', {
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
      Axios.get('https://markal.servehttp.com/dashboard/projects')
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

  handleUpdateList = () => {
    this.getProjects("");
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

    console.log("State", this.state);

    let projects = this.state.projects
      .filter(p => this.filterScoop(p))
      .map((p, i) => <Project data={p} handleDetails={this.handleDetails} key={i} />)

    //If the entered values ​​don't match the data in the database, display a message
    let message = '';
    if (this.state.search) {
      message = (<p>{projects.length} projets trouvés</p>)
    }

    // If there are no projects in the database, display a message
    if (projects.length < 1) {
      if (!this.state.search) {
        message = (<p>Il n'y aucun projet dans la base de données. Veuillez vous connectez afin de créer un projet</p>)
      }
    }

    // Display the details for a project
    let project_details = '';
    if(this.state.details_project){
      project_details = (<ProjectDetails data={this.state.details_project} />);
    }

    return (
      <div>
        {/* Display the detail for a project */}
        {project_details}

        {/* Display the different filter */}
        <Filter
          ref={(filter) => this.filter = filter}
          handleStatusChange={this.handleStatusChange}
          handleDatePickerChange={this.handleDatePickerChange}
          handleDateTypeChange={this.handleDateTypeChange}
          handleTagsChange={this.handleTagsChange}
          handleSearch = {this.handleSearch}
        />

        <RaisedButton
          icon={<MDCached />}
          primary={true}
          onClick={this.handleUpdateList}
        />

        {/* Display the different messages */}
        {message}

        {/* Display the card for the projects*/}
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
