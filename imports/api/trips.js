import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Trips = new Mongo.Collection('trips');

Meteor.methods({
  'trips.create'(name, days, nights) {
    check(name, String);
    check(days, Number);
    check(nights, Number);

    var new_trip = Trips.insert({name: name});
    // todo: create lists and tasks from template

    return new_trip;
  }
});

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('trips.by_id', function tripsByIdPublication(trip_id) {
    return Trips.find( { _id: trip_id } );
  });
}
