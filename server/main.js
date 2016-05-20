import '../imports/api/trips.js';

// server I18n
import { I18n } from 'react-i18nify';
import EN_LOCALE from '../imports/locales/en.js';
import RU_LOCALE from '../imports/locales/ru.js';

I18n.loadTranslations({
  en: EN_LOCALE,
  ru: RU_LOCALE
});

// data publications
Meteor.publish('trips.by_id', function tripsByIdPublication(trip_id) {
  return Trips.find( { _id: trip_id } );
});

Meteor.publish('lists.by_trip_id', function listsByTripIdPublication(trip_id) {
  return Lists.find( {trip_id: trip_id} );
});

Meteor.publish('items.by_list_id', function itemsByListIdPublication(list_id) {
  return Items.find( {list_id: list_id} );
});
