import React, {PropTypes} from 'react';
import { I18n } from 'react-i18nify';
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
          <span onClick={props.onNameClick}>
            {props.tripName} ({I18n.t('trips.days')} {props.days} / {I18n.t('trips.nights')} {props.nights}) 
          </span>
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
  days: PropTypes.number,
  nights: PropTypes.number,
  edit: PropTypes.bool.isRequired,
  editedText: PropTypes.string,
  onNameClick: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onFocusLost: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
  children: PropTypes.any
};

export default Trip;
