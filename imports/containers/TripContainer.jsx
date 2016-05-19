import React, { Component, PropTypes } from 'react'
import { I18n } from 'react-i18nify'
import { createContainer } from 'meteor/react-meteor-data';

import Trip from '../ui/Trip.jsx'
import NavbarContainer from '../containers/NavbarContainer.jsx'

import { Trips, Lists, Items } from '../api/collections.js';

class TripContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    I18n.setLocale(this.props.routeParams.locale)
  }

  renderLists() {
    return (
      <div>
        {this.props.lists.map( function(list){
          return (
            <div key={list._id}>
              <p>{list.name}</p>
            </div>
          )
        }.bind(this))
        }
      </div>
    )
  }

  render() {
    return (
      <div>
        <NavbarContainer />
        <Trip tripName={this.props.trip.name || ''}>
          {this.renderLists()}
        </Trip>
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
  Meteor.subscribe('lists.by_trip_id', params.trip_id);
  return {
    trip: Trips.findOne(params.trip_id) || {},
    lists: Lists.find().fetch()
  };
}, TripContainer);
