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

    const item = Items.findOne(itemId);

    Items.remove(itemId);

    const items = Items.find({ trip_id: item.trip_id, list_id: item.list_id }, { sort: { position: 1 } }).fetch();
    Meteor.call('items.reorder', items);
  },
  'items.create' (tripId, listId, name, count) {
    check(tripId, String);
    check(listId, String);
    check(name, String);
    check(count, Number);

    const itemCount = Items.find({trip_id: tripId, list_id: listId}).count();

    Items.insert({
      trip_id: tripId,
      list_id: listId,
      checked: false,
      count: count,
      name: name.trim(),
      position: itemCount
    });
  },
  'items.update' (itemId, name, count) {
    check(itemId, String);
    check(name, String);
    check(count, Number);

    Items.update(itemId, { $set: { name: name.trim(), count: count } });
  },
  'items.reorder' (orderedItems) {
    check(orderedItems, Array);

    for (let i = 0; i < orderedItems.length; i++) {
      const itemId = orderedItems[i]._id;
      Items.update(itemId, { $set: { position: i } });
    }
  }
});
