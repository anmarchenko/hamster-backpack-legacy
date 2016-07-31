import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { I18n } from 'react-i18nify';
import isString from 'is-string';
import math from 'mathjs';

import { Trips, Lists, Items } from './collections.js';

import BasicTemplate from '../templates/basic.js';

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

    for (let list of BasicTemplate) {
      const listId = Lists.insert({
        trip_id: newTripId,
        name: I18n.t(`templates.lists.${list.label}`)
      });
      for (let item of list.items) {
        let count = item.count;
        if (isString(count)) {
          count = count.replace('[days]', days);
          count = count.replace('[nights]', nights);
          count = math.floor(math.eval(count));
        }
        Items.insert({
          trip_id: newTripId,
          list_id: listId,
          checked: false,
          count: count,
          name: I18n.t(`templates.items.${item.label}`)
        });
      }
    }

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
