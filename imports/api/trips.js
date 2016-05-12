import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Trips = new Mongo.Collection('trips');

Meteor.methods({
  'trips.create'(trip) {
    check(trip.name, String);
    check(trip.days, Number);
    check(trip.nights, Number);

    
  }
});
