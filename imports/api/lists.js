import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Lists, Items } from './collections.js';

Meteor.methods({
  'lists.delete' (listId) {
    check(listId, String);
    const list = Lists.findOne(listId);

    Lists.remove(listId);
    Items.remove( {listId: listId} );

    const lists = Lists.find({ trip_id: list.trip_id }, { sort: { position: 1 } }).fetch();

    Meteor.call('lists.reorder', lists);
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

    const listsCount = Lists.find({trip_id: tripId}).count();

    Lists.insert({
      name: name.trim(),
      trip_id: tripId,
      position: listsCount
    });
  },
  'lists.reorder' (orderedLists) {
    check(orderedLists, Array);

    for (let i = 0; i < orderedLists.length; i++) {
      const listId = orderedLists[i]._id;
      Lists.update(listId, { $set: { position: i } });
    }
  }
});
