import React, { Component, PropTypes } from 'react'
import { I18n } from 'react-i18nify'
import { createContainer } from 'meteor/react-meteor-data';

import Trip from '../ui/Trip.jsx'
import NavbarContainer from '../containers/NavbarContainer.jsx'

import { Trips } from '../api/trips.js';

class TripContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    I18n.setLocale(this.props.routeParams.locale)
  }

  render() {
    return (
      <div>
        <NavbarContainer />
        <Trip tripName={this.props.trip.name} />
      </div>
    )
  }
}

TripContainer.propTypes = {
  trip: PropTypes.object
};

TripContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default createContainer(({ params }) => {
  Meteor.subscribe('trips.by_id', params.trip_id);
  return {
    trip: Trips.findOne(params.trip_id) || {}
  };
}, TripContainer);
