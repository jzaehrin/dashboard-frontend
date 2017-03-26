import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MdSettings from 'material-ui/svg-icons/action/settings';
import MdDashboard from 'material-ui/svg-icons/action/dashboard';


import Admin from '../Admin';
import Dashboard from '../Dashboard';

export default class App extends Component {

  state = {
    admin: false,
  };

  handleTitleTouchTap = () => {
    console.debug(this);
  }

  // Switching view between admin panel and 
  handleToogleTab = () => {
    this.setState(s => {
      return {admin: !s.admin}
    })
  }


  render() {
    let tab = (
      <Dashboard />
    );
    let icon = (
      <IconButton>
        <MdSettings />
      </IconButton>
    );

    console.log(this.state.admin)

    if (this.state.admin) {
      tab = (
        <Admin />
      );
      icon = (
        <IconButton>
          <MdDashboard />
        </IconButton>
      );
    }

    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={<span>Dashboard</span>}
            onTitleTouchTap={this.handleTitleTouchTap}
            onRightIconButtonTouchTap={this.handleToogleTab}
            iconElementLeft={<p />}
            iconElementRight={icon}
          />

          {tab}
        </div>
      </MuiThemeProvider>
    );
  }
}
