import React, { PropTypes } from 'react';

import {Translate} from 'react-i18nify'

const Navbar = (props) => {
  let logInOrOut = null;
  let userEmail = null;
  if(Meteor.userId()) {
    logInOrOut = (
      <li className="navbar-item">
        <a className="navbar-link" href="javascript:void(0)" onClick={props.onLogout}>
          <Translate value="navbar.logout" />
        </a>
      </li>
    )
    if (props.user) {
      userEmail = (
        <li className="navbar-item">
          <a className="navbar-link" href={`/${props.locale}`}>
            {props.user.services.google.email}
          </a>
        </li>
      )
    }
  } else {
    logInOrOut = (
      <li className="navbar-item">
        <a className="navbar-link" href="javascript:void(0)" onClick={props.onLogin}>
          <Translate value="navbar.login" />
        </a>
      </li>
    )
  }

  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar-list">
          <li className="navbar-item">
            <a className="navbar-link" href={`/${props.locale}`}>Hamster's Backpack</a>
          </li>
        </ul>
        <ul className="navbar-list navbar-menu right">
          {userEmail}
          {logInOrOut}
        </ul>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
  locale: PropTypes.string.isRequired
}

export default Navbar;
