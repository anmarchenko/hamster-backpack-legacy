import React, {PropTypes} from 'react';

const Trip = (props) => (
  <div className="container trip">
    <div className="trip-header">{props.tripName}</div>
    {props.children}
  </div>
);

Trip.propTypes = {
  tripName: PropTypes.string.isRequired,
  children: PropTypes.object
};

export default Trip;
