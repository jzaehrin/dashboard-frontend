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

  handleRequestDelete = (tag) => {
    this.setState(s => {
      return {tags: [...s.tags.filter(t => t !== tag)]}
    }, () => {
      this.props.handleTagsChange(this.state.tags)
    });
  }

  handleDatePickerChange = (empty, date) => {
    this.props.handleDatePickerChange(date);
  }

  handleDateTypeChange = (event, value) => {
    this.props.handleDateTypeChange(value);
  }

  handleSearch = (event) => {
    this.props.handleSearch(this.search.input.value);
  }

  handleClearSearch = (event) => {
    this.search.input.value = "";
    this.props.handleSearch("");
  }

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
    let tags = this.state.tags.map((tag, index) => (
      <Chip
        onRequestDelete={this.handleRequestDelete.bind(null, tag)}
      >{tag}</Chip>
    ));

    return (
      <div>
        <div>
          <TextField
            hintText="Only 1 keywords or sentence"
            floatingLabelText="Search by keywords"
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
              label="Before"
            />
            <RadioButton
              value={1}
              label="After"
            />
          </RadioButtonGroup>
          <TextField
            hintText="Keywords without accent !"
            floatingLabelText="Add tag for filter"
            ref={(field) => this.tagField = field}
          />
          <RaisedButton label="Add" primary={true} onClick={this.handleAddTag}/>
          <div>
            {tags}
          </div>
        </div>
      </div>
    );
  }
}
