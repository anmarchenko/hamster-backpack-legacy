import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { I18n } from 'react-i18nify';
import isString from 'is-string';

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
        var count = item.count;
        if (isString(item.count)){
          count = item.count.replace('[days]', days);
          count = count.replace('[nights]', nights);
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
