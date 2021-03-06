import { routes, catalogs, publishTypesInfo, publishTypes } from 'funong-common/lib/appConstants';
import { actions as publishesActions } from 'api/publishes/ducks';
import addDays from 'date-fns/add_days';
import startOfDay from 'date-fns/start_of_day';

const type = publishTypes.inquiry;
const info = publishTypesInfo[type];

export default type;
export const shop = info.shop;
export const catalogGroups = catalogs.groupedFarm;

// page for list
export const listRoute = {
  path: routes[`page_${info.plural}`],
  name: `page_${info.plural}`,
};
export const noRecommend = true;

// page for single product
export const pageRoute = {
  path: routes[`page_${info.route}`],
  name: `page_${info.route}`,
};

export const actions = publishesActions[type];

export const FORM_NAME = type;

export const EMPTY_PRODUCT = {
  category: null,
  species: null,
  name: '',
  location: null,
  desc: '',
  endAt: startOfDay(addDays(new Date(), 7)).getTime(),
  price: '面议',
  range: [],
};
