import React, {Component, PropTypes} from 'react';
import {Translate} from 'react-i18nify';

Trip = (props) => (
  <div className="container trip">
    <div className="trip-header">{props.tripName}</div>
    {props.children}
  </div>
);

Trip.propTypes = {
  tripName: PropTypes.string.isRequired
};

export default Trip;
