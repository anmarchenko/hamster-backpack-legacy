import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { I18n } from 'react-i18nify';

import { Trips, Lists, Items } from './collections.js';

import Templator from './templator.js';

Meteor.methods({
  'trips.create' (name, days, nights, locale) {
    check(name, String);
    check(locale, String);
    check(days, Number);
    check(nights, Number);

    I18n.setLocale(locale);

    const newTripId = Trips.insert({
      name: name,
      userId: Meteor.userId(),
      createdAt: Date.now()
    });

    Templator.process(newTripId, days, nights, Meteor.user());
    
    return newTripId;
  },
  'trips.update' (tripId, name) {
    check(tripId, String);
    check(name, String);

    Trips.update(tripId, { $set: { name: name.trim() } });
  },
  'trips.delete' (tripId) {
    check(tripId, String);

    const trip = Trips.findOne( { _id: tripId } );

    if (!Meteor.userId() || Meteor.userId() !== trip.userId) {
      return;
    }

    Items.remove({ tripId: tripId });
    Lists.remove({ tripId: tripId });
    Trips.remove(tripId);
  }
});
