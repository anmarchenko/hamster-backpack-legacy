import '../imports/api/tasks.js';
import '../imports/api/trips.js';

import { I18n } from 'react-i18nify';
import EN_LOCALE from '../imports/locales/en.js';
import RU_LOCALE from '../imports/locales/ru.js';

I18n.loadTranslations({
  en: EN_LOCALE,
  ru: RU_LOCALE
});
