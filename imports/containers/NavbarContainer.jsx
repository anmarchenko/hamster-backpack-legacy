import React, { Component, PropTypes } from 'react';

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

  render() {
    return (
      <Navbar
        onLogin={this.login.bind(this)}
        onLogout={this.logout.bind(this)}
        user={this.props.user}
        locale={this.props.locale}
      />
    )
  }
}

NavbarContainer.propTypes = {
  user: PropTypes.object,
  onUserChange: PropTypes.func,
  locale: PropTypes.string
}

export default createContainer(() => {
  Meteor.subscribe('currentUserData');
  return {
    user: Meteor.users.findOne(Meteor.userId())
  };
}, NavbarContainer);
