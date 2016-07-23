import React, {PropTypes} from 'react';
import ClipboardButton from '../ui/ClipboardButton.jsx';
const Trip = (props) => (
  <div className="container trip">
    <div className="trip-header">
      <span>{props.tripName}</span>
      <ClipboardButton tripId={props.tripId} />
    </div>
    {props.children}
  </div>
);

Trip.propTypes = {
  tripId: PropTypes.string.isRequired,
  tripName: PropTypes.string.isRequired,
  children: PropTypes.any
};

export default Trip;
