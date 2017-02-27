import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Authenticate from '../Authenticate';

export default class App extends Component {
  state = {};

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div id="dashboard" />
          <div id="admin">
            <Authenticate />
          </div>
          <div id="details" />
        </div>
      </MuiThemeProvider>
    );
  }
}
