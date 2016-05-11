import React, { Component, PropTypes } from 'react'
import { I18n } from 'react-i18nify'

import TripForm from '../ui/TripForm.jsx'
import NavbarContainer from '../containers/NavbarContainer.jsx'

import stepsForm from '../lib/stepsForm.js'

export default class TripFormContainer extends Component {
  componentWillMount() {
    I18n.setLocale(this.props.routeParams.locale)
  }

  componentDidMount() {
    var theForm = document.getElementById( 'theForm' );

    new stepsForm( theForm, {
      onSubmit : function( form ) {
        // hide form
        classie.addClass( theForm.querySelector( '.simform-inner' ), 'hide' );

        /*
        form.submit()
        or
        AJAX request (maybe show loading indicator while we don't have an answer..)
        */

        // let's just simulate something...
        var messageEl = theForm.querySelector( '.final-message' );
        messageEl.innerHTML = 'Thank you! We\'ll be in touch.';
        classie.addClass( messageEl, 'show' );
      }
    } );
  }

  render() {
    return (
      <div>
        <NavbarContainer />
        <TripForm />
      </div>
    )
  }
}

TripFormContainer.propTypes = {}

TripFormContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}
