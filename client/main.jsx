import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, browserHistory, Redirect } from 'react-router';

import { I18n } from 'react-i18nify';
import EN_LOCALE from '../imports/locales/en.js';
import RU_LOCALE from '../imports/locales/ru.js';

import Landing from '../imports/ui/Landing.jsx'
import ListContainer from '../imports/containers/ListContainer.jsx'
import TripFormContainer from '../imports/containers/TripFormContainer.jsx'

renderRoutes = () => (
  <Router history={browserHistory}>
    <Redirect from="/" to="/en" />
    <Route path="/:locale" component={Landing} />
    <Route path="/:locale/new" component={TripFormContainer} />
    <Route path="/:locale/old_todos" component={ListContainer} />
  </Router>
);

Meteor.startup(() => {
  I18n.loadTranslations({
    en: EN_LOCALE,
    ru: RU_LOCALE
  });

  render(renderRoutes(), document.getElementById('hamsters-backpack-app'));
});
