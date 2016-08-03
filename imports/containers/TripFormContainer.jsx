import React, { Component, PropTypes } from 'react';
import { I18n } from 'react-i18nify';

import TripForm from '../ui/TripForm.jsx';
import NavbarContainer from '../containers/NavbarContainer.jsx';

import stepsForm from '../lib/stepsForm.js';

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
    $('body').removeClass('trip-form-background')
  }

  fieldChanged(event) {
    const stateChange = {}
    stateChange[event.target.name] = event.target.value
    if (event.target.name === 'days') {
      const numDays = Number.parseInt(event.target.value);
      stateChange.nights = numDays - 1;
    }
    this.setState(stateChange)
  }

  formSubmitted() {
    Meteor.call('trips.create',
      this.state.name,
      Number.parseInt(this.state.days),
      Number.parseInt(this.state.nights),
      this.props.routeParams.locale,
      (error, result) => {
        if (error) {
          window.console.log(error);
          this.context.router.push(`/${this.props.routeParams.locale}`);
        } else {
          this.context.router.push(`/${this.props.routeParams.locale}/trips/${result}`);
        }
      }
    )
  }

  render() {
    return (
      <div>
        <NavbarContainer locale={this.props.routeParams.locale} />
        <TripForm fieldChangeHandler={this.fieldChanged.bind(this)} nightsCount={this.state.nights} />
      </div>
    )
  }
}

TripFormContainer.propTypes = {
  routeParams: PropTypes.object
};

TripFormContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};
