import React, { Component, PropTypes } from 'react';
import { I18n } from 'react-i18nify';

import TripForm from '../ui/TripForm.jsx';
import NavbarContainer from '../containers/NavbarContainer.jsx';

export default class TripFormContainer extends Component {
  componentWillMount() {
    I18n.setLocale(this.props.routeParams.locale);
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

TripFormContainer.propTypes = {};

TripFormContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
};
