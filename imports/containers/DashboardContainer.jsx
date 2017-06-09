import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-i18nify';

import Landing from '../ui/Landing.jsx';
import NavbarContainer from '../containers/NavbarContainer.jsx';
import TripListContainer from '../containers/TripListContainer.jsx';

class DashboardContainer extends Component {
  componentWillMount() {
    I18n.setLocale(this.props.routeParams.locale);
  }

  _handleUserChange() {
    this.forceUpdate();
  }

  newTrip() {
    this.context.router.push(`/${this.props.routeParams.locale}/new`);
  }

  renderContent() {
    if (Meteor.userId()) {
      return (
        <TripListContainer
          locale={this.props.routeParams.locale}
          onNewTrip={this.newTrip.bind(this)}
        />
      )
    } else {
      return (
        <Landing
          routeParams={this.props.routeParams}
          onNewTrip={this.newTrip.bind(this)}
        />
      )
    }
  }

  render() {
    return (
      <span>
        <NavbarContainer onUserChange={this._handleUserChange.bind(this)} routeParams={this.props.routeParams} location={this.props.location} />
        { this.renderContent() }
      </span>
    )
  }
}

DashboardContainer.propTypes = {
  trips: PropTypes.array,
  routeParams: PropTypes.object,
  location: PropTypes.object
};

DashboardContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DashboardContainer;
