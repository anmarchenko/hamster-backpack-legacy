import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Landing from '../imports/ui/Landing.jsx'
import ListContainer from '../imports/containers/ListContainer.jsx'
import TripFormContainer from '../imports/containers/TripFormContainer.jsx'

renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Landing} />
    <Route path="/new" component={TripFormContainer} />
    <Route path="/old_todos" component={ListContainer} />
  </Router>
);

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('hamsters-backpack-app'));
});
