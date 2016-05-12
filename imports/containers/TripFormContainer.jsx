import React, { Component, PropTypes } from 'react'
import { I18n } from 'react-i18nify'

import TripForm from '../ui/TripForm.jsx'
import NavbarContainer from '../containers/NavbarContainer.jsx'

import stepsForm from '../lib/stepsForm.js'

export default class TripFormContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      days: null,
      nights: null
    };
  }

  componentWillMount() {
    I18n.setLocale(this.props.routeParams.locale)
    // fixme: find better way
    $('body').addClass('trip-form-background')
  }

  componentDidMount() {
    var theForm = document.getElementById( 'theForm' );

    new stepsForm( theForm, {
      onSubmit : this.formSubmitted.bind(this)
    } );
  }
  componentWillUnmount() {
    // fixme: find better way
    $('body').removeClass('trip-form-background')
  }

  fieldChanged(event) {
    stateChange = {}
    stateChange[event.target.name] = event.target.value
    if (event.target.name === 'days') {
      num_days = Number.parseInt(event.target.value);
      stateChange.nights = num_days - 1;
    }
    this.setState(stateChange)
  }

  formSubmitted() {
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <NavbarContainer />
        <TripForm fieldChangeHandler={this.fieldChanged.bind(this)} nights_count={this.state.nights} />
      </div>
    )
  }
}

TripFormContainer.propTypes = {}

TripFormContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}
