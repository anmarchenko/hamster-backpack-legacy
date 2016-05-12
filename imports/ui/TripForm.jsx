import React, { Component, PropTypes } from 'react'
import { Translate } from 'react-i18nify'

TripForm = (props) => (
  <div className="container trip-form">
    <form id="theForm" className="simform" autocomplete="off">
      <div className="simform-inner">
        <ol className="questions">
          <li>
            <span><label for="name"><Translate value="new_form.name_label" /></label></span>
            <input id="name" name="name" type="text" onChange={props.fieldChangeHandler} />
          </li>
          <li>
            <span><label for="days"><Translate value="new_form.days_label" /></label></span>
            <input id="days" name="days" type="number" min="1" onChange={props.fieldChangeHandler}/>
          </li>
          <li>
            <span><label for="nights"><Translate value="new_form.nights_label" /></label></span>
            <input id="nights" name="nights" type="number" min="0" onChange={props.fieldChangeHandler} value={props.nights_count || ''} />
          </li>
        </ol>
        <div className="controls">
          <button className="next"></button>
          <div className="progress"></div>
          <span className="number">
            <span className="number-current"></span>
            <span className="number-total"></span>
          </span>
          <span className="error-message empty">
            <Translate value="new_form.error" />
          </span>
          <span className="error-message number-error">
            <Translate value="new_form.error_number" />
          </span>
        </div>
      </div>
    </form>
  </div>
)

TripForm.propTypes = {
  fieldChangeHandler: PropTypes.func.isRequired,
  nights_count: PropTypes.number
}

export default TripForm
