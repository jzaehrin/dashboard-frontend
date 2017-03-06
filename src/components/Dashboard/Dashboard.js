import React, { Component } from 'react';
import GridList from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

export default class Dashboard extends Component {
  state = {};

  render() {
    return (

      <GridList
        cellHeight={200}
      >
        <Subheader>Projects</Subheader>
      </GridList>
    );
  }
}
