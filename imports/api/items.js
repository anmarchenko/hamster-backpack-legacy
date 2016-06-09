import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Items } from './collections.js';

Meteor.methods({
  'items.check' (itemId, isChecked) {
    check(itemId, String);
    check(isChecked, Boolean);

    Items.update(itemId, { $set: { checked: isChecked } });
  },
  'items.delete' (itemId) {
    check(itemId, String);

    Items.remove(itemId);
  },
  'items.create' (tripId, listId, name, count) {
    check(tripId, String);
    check(listId, String);
    check(name, String);
    check(count, Number);

    Items.insert({
      trip_id: tripId,
      list_id: listId,
      checked: false,
      count: count,
      name: name.trim()
    });
  },
  'items.update' (itemId, name, count) {
    check(itemId, String);
    check(name, String);
    check(count, Number);

    Items.update(itemId, { $set: { name: name.trim(), count: count } });
  }
});
