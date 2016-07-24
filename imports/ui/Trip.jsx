import React, {PropTypes} from 'react';
import ClipboardButton from '../ui/ClipboardButton.jsx';
const Trip = (props) => {
  let tripHeader = null

  if (props.edit) {
    tripHeader = (
      <div className="trip-header">
        <input
          type="text"
          name="trip_name"
          value={props.editedText}
          onChange={props.onInputChange}
          onBlur={props.onFocusLost}
          onKeyUp={props.onKeyPress}
          autoFocus
        />
      </div>
    )
  } else {
    tripHeader = (
        <div className="trip-header">
          <span onClick={props.onNameClick}>{props.tripName}</span>
          <ClipboardButton tripId={props.tripId} />
        </div>
      )
  }

  return (
    <div className="container trip">
      {tripHeader}
      {props.children}
    </div>
  )
};

Trip.propTypes = {
  tripId: PropTypes.string.isRequired,
  tripName: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  editedText: PropTypes.string,
  onNameClick: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFocusLost: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  children: PropTypes.any
};

export default Trip;
