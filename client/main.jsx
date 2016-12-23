import React from 'react'
import {render} from 'react-dom'
import {Router, Route, browserHistory, Redirect} from 'react-router'
import {Meteor} from 'meteor/meteor'

import {I18n} from 'react-i18nify'
import EN_LOCALE from '../imports/locales/en.js'
import RU_LOCALE from '../imports/locales/ru.js'

import DashboardContainer from '../imports/containers/DashboardContainer.jsx'
import TripFormContainer from '../imports/containers/TripFormContainer.jsx'
import TripContainer from '../imports/containers/TripContainer.jsx'

import toastr from 'toastr';

// toastr is for notifications
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "1500",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

const renderRoutes = () => (
  <Router history={browserHistory}>
    <Redirect from="/" to="/en"/>
    <Route path="/:locale" component={DashboardContainer}/>
    <Route path="/:locale/new" component={TripFormContainer}/>
    <Route path="/:locale/trips/:trip_id" component={TripContainer}/>
  </Router>
);

Meteor.startup(() => {
  I18n.loadTranslations({en: EN_LOCALE, ru: RU_LOCALE});
  render(renderRoutes(), document.getElementById('hamsters-backpack-app'));
});
