import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Items } from './collections.js';

Meteor.methods({
  'items.check' (itemId, isChecked) {
    check(itemId, String);
    check(isChecked, Boolean);
    
    Items.update(itemId, { $set: { checked: isChecked } });
  }
});
