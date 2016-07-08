import React, {Component, PropTypes} from 'react';
import {I18n} from 'react-i18nify';
import {createContainer} from 'meteor/react-meteor-data';

import Trip from '../ui/Trip.jsx';
import ListContainer from './ListContainer.jsx';
import NewListContainer from './NewListContainer.jsx';

import {Trips, Lists} from '../api/collections.js';

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
      <div className="tasks-area">
        {this.props.lists.map(function(list) {
          return (<ListContainer key={list._id} list={list}/>)
        })
        }
      </div>
    )
  }

  render() {
    return (
      <Trip tripName={this.props.trip.name || ''}>
        {this.renderLists()}
        <NewListContainer tripId={this.props.trip._id || ''} />
      </Trip>
    )
  }
}

TripContainer.propTypes = {
  trip: PropTypes.object,
  lists: PropTypes.array,
  routeParams: PropTypes.object
};

TripContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default createContainer(({params}) => {
  Meteor.subscribe('trips.by_id', params.trip_id);
  Meteor.subscribe('lists.by_trip_id', params.trip_id);
  Meteor.subscribe('items.by_trip_id', params.trip_id);
  return {
    trip: Trips.findOne(params.trip_id) || {},
    lists: Lists.find().fetch()
  };
}, TripContainer);
