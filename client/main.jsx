import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import ListContainer from '../imports/containers/ListContainer.jsx';

Meteor.startup(() => {
  render(<ListContainer />, document.getElementById('render-target'));
});
