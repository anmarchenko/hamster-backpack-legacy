import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { I18n } from 'react-i18nify';

import { Trips, Lists, Items } from './collections.js';

import BasicTemplate from '../templates/basic.js';

Meteor.methods({
  'trips.create'(name, days, nights, locale) {
    check(name, String);
    check(days, Number);
    check(nights, Number);

    I18n.setLocale(locale);

    var new_trip_id = Trips.insert({name: name});

    for (var list of BasicTemplate) {
      var list_id = Lists.insert({ trip_id: new_trip_id, name: I18n.t('templates.lists.' + list.label) });
      for (var item of list.items) {
        var count = 0;
        if (typeof item.count === "number"){
          count = item.count;
        } else {
          count = item.count.replace('[days]', days);
          count = Math.floor(eval(item.count));
        }
        Items.insert({
          trip_id: new_trip_id,
          list_id: list_id,
          checked: false,
          count: count,
          name: I18n.t('templates.items.' + item.label)
        });
      }
    }

    return new_trip_id;
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('trips.by_id', function tripsByIdPublication(trip_id) {
    return Trips.find( { _id: trip_id } );
  });

  Meteor.publish('lists.by_trip_id', function listsByTripIdPublication(trip_id) {
    return Lists.find( {trip_id: trip_id} );
  });

  Meteor.publish('items.by_list_id', function itemsByListIdPublication(list_id) {
    return Items.find( {list_id: list_id} );
  });
}
