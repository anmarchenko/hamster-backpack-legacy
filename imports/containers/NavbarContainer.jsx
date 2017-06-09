import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { I18n } from 'react-i18nify';

import {createContainer} from 'meteor/react-meteor-data';

import Navbar from '../ui/Navbar.jsx';
import toastr from 'toastr';

class NavbarContainer extends Component {
  login() {
    const props = this.props;
    Meteor.loginWithGoogle({}, function(error) {
      if (error) {
        toastr.error(error.message);
      } else {
        if (props.onUserChange) {
          props.onUserChange();
        }
      }
    });
  }

  logout() {
    const props = this.props;
    Meteor.logout(function(error) {
      if (error) {
        toastr.error(error.message);
      } else {
        if (props.onUserChange) {
          props.onUserChange();
        }
      }
    });
  }

  changeLocale() {
    let newPath = undefined;
    let newLocale = undefined;
    if (this.props.routeParams.locale === 'en') {
      newPath = this.props.location.pathname.replace('/en', '/ru');
      newLocale = 'ru';
    } else {
      newPath = this.props.location.pathname.replace('/ru', '/en');
      newLocale = 'en';
    }
    this.context.router.push(newPath);
    I18n.setLocale(newLocale)
  }

  render() {
    return (
      <Navbar
        onLogin={this.login.bind(this)}
        onLogout={this.logout.bind(this)}
        onChangeLocale={this.changeLocale.bind(this)}
        user={this.props.user}
        locale={this.props.routeParams.locale}
      />
    )
  }
}

NavbarContainer.propTypes = {
  user: PropTypes.object,
  onUserChange: PropTypes.func,
  routeParams: PropTypes.object,
  location: PropTypes.object
}

NavbarContainer.contextTypes = {
  router: PropTypes.object.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('currentUserData');
  return {
    user: Meteor.users.findOne(Meteor.userId())
  };
}, NavbarContainer);
