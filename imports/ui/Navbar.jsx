import React, { PropTypes } from 'react';

import {Translate} from 'react-i18nify'

const Navbar = (props) => {
  let logInOrOut = null;
  let userEmail = null;
  if(Meteor.userId()) {
    logInOrOut = (
      <li className="navbar-item" onClick={props.onLogout}>
        <a className="navbar-link" href="javascript:void(0)">
          <Translate value="navbar.logout" />
        </a>
      </li>
    )
    if (props.user && props.user.services && props.user.services.google) {
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
            <a className="navbar-link hidden-xs" href={`/${props.locale}`}>Hamster's Backpack</a>
            <a className="navbar-link shown-xs" href={`/${props.locale}`}>HB</a>
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
  locale: PropTypes.string
}

export default Navbar;
