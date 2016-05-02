import React, { Component, PropTypes } from 'react';
import { Translate } from 'react-i18nify';

TripForm = (props) => (
  <div className="container">
    <p>
      <Translate value="new_form.placeholder" />
    </p>
  </div>
)

TripForm.propTypes = {};

export default TripForm;
