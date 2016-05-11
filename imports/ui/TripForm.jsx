import React, { Component, PropTypes } from 'react'
import { Translate } from 'react-i18nify'

TripForm = (props) => (
  <div className="container">
    <form id="theForm" className="simform" autocomplete="off">
      <div className="simform-inner">
        <ol className="questions">
          <li>
            <span><label for="q1">What's your favorite movie?</label></span>
            <input id="q1" name="q1" type="text" placeholder="fdsfds"/>
          </li>
          <li>
            <span><label for="q2">Where do you live?</label></span>
            <input id="q2" name="q2" type="text"/>
          </li>
          <li>
            <span><label for="q3">What time do you got to work?</label></span>
            <input id="q3" name="q3" type="text"/>
          </li>
        </ol>
        <div className="controls">
          <button className="next"></button>
          <div className="progress"></div>
          <span className="number">
            <span className="number-current"></span>
            <span className="number-total"></span>
          </span>
          <span className="error-message"></span>
        </div>
      </div>
      <span className="final-message"></span>
    </form>
  </div>
)

TripForm.propTypes = {}

export default TripForm
