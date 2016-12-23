import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Lists, Items } from './collections.js';

Meteor.methods({
  'lists.delete' (listId) {
    check(listId, String);

    Lists.remove(listId);
    Items.remove( {listId: listId} );
  },
  'lists.update' (listId, name) {
    check(listId, String);
    check(name, String);

    Lists.update(listId, { $set: { name: name.trim() } });
  },
  'lists.updateCollapsed' (listId, collapsed) {
    check(listId, String);
    check(collapsed, Boolean);

    Lists.update(listId, { $set: { collapsed: collapsed } });
  },
  'lists.create' (tripId, name) {
    check(tripId, String);
    check(name, String);

    Lists.insert({ name: name.trim(), trip_id: tripId } );
  }
});
