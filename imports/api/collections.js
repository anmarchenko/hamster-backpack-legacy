import { Mongo } from 'meteor/mongo';

export const Trips = new Mongo.Collection('trips');
export const Lists = new Mongo.Collection('lists');
export const Items = new Mongo.Collection('items');
