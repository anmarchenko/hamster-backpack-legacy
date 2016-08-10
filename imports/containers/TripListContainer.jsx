import React, {Component, PropTypes} from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { I18n, Translate } from 'react-i18nify';

import {Trips} from '../api/collections.js';
import SweetAlert from 'sweetalert2';

class TripListContainer extends Component {
  removeTrip(tripId) {
    SweetAlert({
      title: I18n.t('confirmations.header'),
      text: I18n.t('confirmations.trip_content'),
      confirmButtonText: I18n.t('confirmations.yes_delete'),
      cancelButtonText: I18n.t('confirmations.no_keep'),
      type: 'warning',
      showCancelButton: true
    }).then(function() {
      Meteor.call('trips.delete', tripId);
    }.bind(this), function(){});
  }

  renderTrips() {
    if (this.props.trips.length > 0) {
      return (
          <ReactCSSTransitionGroup transitionName="trip" transitionEnterTimeout={500} transitionLeaveTimeout={500} className="trips">
            {this.props.trips.map(function(trip){
              return (
                <div key={trip._id} className="trip-link">
                  <a href={`/${this.props.locale}/trips/${trip._id}`}>{trip.name}</a>
                  <a href='javascript:void(0);'
                     onClick={() => { this.removeTrip(trip._id) } }>
                    <img src='/images/cross.svg' />
                  </a>
                </div>
              )
            }.bind(this))}
        </ReactCSSTransitionGroup>
      )
    } else {
      return (
        <div>
          <Translate value='trips.no_trips' />
        </div>
      )
    }
  }

  render() {
    return (
      <div className="container trip-list">
        <div className="row trip-list-header">
          <div className="nine columns">
            <Translate value='trips.header' />
          </div>
          <div className="three columns">
            <button className="button-primary" onClick={this.props.onNewTrip}>
              <Translate value='trips.new_trip' />
            </button>
          </div>
        </div>
        {this.renderTrips()}
      </div>
    )
  }
}

TripListContainer.propTypes = {
  trips: PropTypes.array,
  onNewTrip: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired
};

export default createContainer( () => {
  Meteor.subscribe('trips.by_user');
  return {
    trips: Trips.find({}, {skip: 0, limit: 32, sort: {createdAt: -1}}).fetch() || []
  };
}, TripListContainer);
