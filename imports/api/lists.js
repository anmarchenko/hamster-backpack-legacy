import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Lists } from './collections.js';

Meteor.methods({
  'lists.delete' (listId) {
    check(listId, String);

    Lists.remove(listId);
  }
});
