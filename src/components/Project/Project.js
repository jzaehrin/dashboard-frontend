import React, { Component, PropTypes } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class Dashboard extends Component {
  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      short_description: PropTypes.string,
      status: PropTypes.string,
      deadline: PropTypes.string,
      tags: PropTypes.string,
      nbr_people: PropTypes.number,
      user: PropTypes.shape({
        email: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {};

  render() {
    return (
      <Card>
        <CardHeader
          title="Status"
          subtitle="Progress"
        />
        <CardTitle title="Project name" subtitle="Description" />
        <CardText>
          <p>
            lorem alalalla
          </p>
          <p>
            Lorem hwalhdawgkadwkawl bdanm
          </p>
        </CardText>
        <CardActions>
          <FlatButton label="Action1" />
        </CardActions>
      </Card>
    );
  }
}