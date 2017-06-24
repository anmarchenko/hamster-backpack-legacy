import { Lists, Items } from './collections.js';

import { I18n } from 'react-i18nify';

import BasicTemplate from '../templates/basic.js';
import HamsterTemplate from '../templates/hamster.js';

import isString from 'is-string';
import math from 'mathjs';

const Templator = {
  'process' (tripId, days, nights, user) {
    let template = BasicTemplate;
    let hamster = false;
    if (this.isHamster(user)) {
      hamster = true;
      template = HamsterTemplate;
    }

    for (let listIndex = 0; listIndex < template.length; listIndex++) {
      const list = template[listIndex];
      const listId = Lists.insert({
        trip_id: tripId,
        name: hamster ? list.label : I18n.t(`templates.lists.${list.label}`),
        position: listIndex
      });
      for (let index = 0; index < list.items.length; index++) {
        let item = list.items[index];
        let count = item.count;

        if (isString(count)) {
          count = count.replace('[days]', days);
          count = count.replace('[nights]', nights);
          count = math.floor(math.eval(count));
        }

        Items.insert({
          trip_id: tripId,
          list_id: listId,
          checked: false,
          count: count,
          name: hamster ? item.label :  I18n.t(`templates.items.${item.label}`),
          position: index
        });
      }
    }

  },
  'isHamster' (user) {
    if (user && user.services && user.services.google &&
      ['igendou@gmail.com', 'yuyakovleva11@gmail.com'].indexOf(user.services.google.email) !== -1) {
        return true;
    } else {
      return false;
    }
  }
};

export default Templator;
