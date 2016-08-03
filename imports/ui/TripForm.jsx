import React, {PropTypes} from 'react'
import {Translate} from 'react-i18nify'

const TripForm = (props) => (
  <div className="container trip-form">
    <form id="theForm" className="simform" autoComplete="off">
      <div className="simform-inner">
        <ol className="questions">
          <li>
            <span>
              <label htmlFor="name"><Translate value="new_form.name_label"/></label>
            </span>
            <input id="name" name="name" type="text" onChange={props.fieldChangeHandler}/>
          </li>
          <li>
            <span>
              <label htmlFor="days"><Translate value="new_form.days_label"/></label>
            </span>
            <input id="days" name="days" type="number" min="1" onChange={props.fieldChangeHandler}/>
          </li>
          <li>
            <span>
              <label htmlFor="nights"><Translate value="new_form.nights_label"/></label>
            </span>
            <input id="nights" name="nights" type="number" min="0" onChange={props.fieldChangeHandler} value={props.nightsCount || ''}/>
          </li>
        </ol>
        <div className="controls">
          <button className="next hidden-xs"></button>
          <div className="progress"></div>
          <span className="number hidden-xs">
            <span className="number-current"></span>
            <span className="number-total"></span>
          </span>
          <span className="error-message empty">
            <Translate value="new_form.error"/>
          </span>
          <span className="error-message number-error">
            <Translate value="new_form.error_number"/>
          </span>
        </div>
        <div className="mobile-controls shown-xs">
          <button className="button-next">
            Next
          </button>
        </div>
      </div>
    </form>
  </div>
)

TripForm.propTypes = {
  fieldChangeHandler: PropTypes.func.isRequired,
  nightsCount: PropTypes.number
}

export default TripForm
