import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MdSettings from 'material-ui/svg-icons/action/settings';

import Admin from '../Admin';
import Dashboard from '../Dashboard';
import ManageProject from '../Admin/ManageProject';
import ManageUser from '../Admin/ManageUser';

export default class App extends Component {
  constructor() {
    super();

    this.handleTitleTouchTap = this.handleTitleTouchTap.bind(this);
  }

  state = {};

  handleTitleTouchTap() {
    console.debug(this);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={<span>Dashboard</span>}
            onTitleTouchTap={this.handleTitleTouchTap}
            iconElementLeft={<p />}
            iconElementRight={<IconButton><MdSettings /></IconButton>}
          />
          <div id="dashboard">
            <Dashboard />
          </div>
          <div id="admin">
            <Admin />
          </div>
          <div id="details" />
          <div id="manageUser">
            <ManageUser />
          </div>
          <div id="manageProject">
            <ManageProject />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
