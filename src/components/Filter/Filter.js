import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import RadioButton, { RadioButtonGroup } from 'material-ui/RadioButton';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import MDClear from 'material-ui/svg-icons/content/clear';
import MDSearch from 'material-ui/svg-icons/action/search';
import {cyanA700 } from 'material-ui/styles/colors';


export default class Filter extends Component {
  static propTypes = {
    handleDatePickerChange: PropTypes.func.isRequired,
    handleDateTypeChange: PropTypes.func.isRequired,
    handleStatusChange: PropTypes.func.isRequired,
    handleTagsChange: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
  }

  state = {
    statusValue: '',
    tags: [],
  }

  // Delete a tag
  handleRequestDelete = (tag) => {
    this.setState(s => {
      return {tags: [...s.tags.filter(t => t !== tag)]}
    }, () => {
      this.props.handleTagsChange(this.state.tags)
    });
  }

  //
  handleDatePickerChange = (empty, date) => {
    this.props.handleDatePickerChange(date);
  }

  //
  handleDateTypeChange = (event, value) => {
    this.props.handleDateTypeChange(value);
  }

  // Create a search
  handleSearch = (event) => {
    this.props.handleSearch(this.search.input.value);
  }

  // Clear the search
  handleClearSearch = (event) => {
    this.search.input.value = "";
    this.props.handleSearch("");
  }

  // Add a tag
  handleAddTag = (event) => {
    event.preventDefault();

    if (this.tagField.input.value) {
      this.setState(s => ({
        tags: [...s.tags, this.tagField.input.value]
      }), () => {
        this.tagField.input.value = ''
        this.props.handleTagsChange(this.state.tags)
      });
    }
  }

  // Define the different status for the filter of projects
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
        selectedStatus = 'finish';
        break;
      default:
        statusValue = '';
        break;
    }
    this.setState({statusValue, selectedStatus});
    this.props.handleStatusChange(selectedStatus);
  };

  render() {
    const chip = {
      margin: 4,
    };

    // Add a tag
    let tags = this.state.tags.map((tag, index) => (
      <Chip
        style={chip}
        backgroundColor={cyanA700}
        onRequestDelete={this.handleRequestDelete.bind(null, tag)}
      >{tag}</Chip>
    ));

    // Display the different filters
    return (
      <div>
        <div>
          {/* Display the field for the search */}
          <TextField
            hintText="Seulement un mot-clé"
            floatingLabelText="Chercher par mots-clé"
            ref={(search) => this.search = search}
          />
          <RaisedButton
            icon={<MDSearch />}
            primary={true}
            onClick={this.handleSearch}
          />
          <RaisedButton
            icon={<MDClear />}
            primary={true}
            onClick={this.handleClearSearch}
          />
        </div>
        <div>
          {/* Display the different status in a selected field*/}
          <SelectField
            floatingLabelText="Status"
            value={this.state.statusValue}
            onChange={this.handleStatusChange}
          >
            <MenuItem value={0} primaryText="<None>" />
            <MenuItem value={1} primaryText="En cours" />
            <MenuItem value={2} primaryText="Annulé" />
            <MenuItem value={3} primaryText="Terminé" />
          </SelectField>
          {/* Display a form for the date and can choose if the date is before or after the date selected */}
          <DatePicker
            hintText="Date de fin"
            container="inline"
            mode="landscape"
            onChange={this.handleDatePickerChange}
          />
          <RadioButtonGroup
            name="dateFiltred"
            onChange={this.handleDateTypeChange}
          >
            <RadioButton
              value={-1}
              label="Avant"
            />
            <RadioButton
              value={1}
              label="Après"
            />
          </RadioButtonGroup>
          {/* Display the field to add different tags */}
          <TextField
            hintText="Mots-clé sans accent !"
            floatingLabelText="Ajouter une tag"
            ref={(field) => this.tagField = field}
          />
          <RaisedButton label="Ajouter" primary={true} onClick={this.handleAddTag}/>
          <div>
            {tags}
          </div>
        </div>
      </div>
    );
  }
}
