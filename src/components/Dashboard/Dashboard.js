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
        <div>Toto</div>
        <div>Toto2</div>
        <div>Toto3</div>
        <div>Toto4</div>
        <div>Toto5</div>
        <div>Toto76</div>
        <div>Toto89</div>
      </GridList>
    );
  }
}
