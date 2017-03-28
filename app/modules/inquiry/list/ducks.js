import _find from 'lodash/find';
import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { inquiriesSelector } from 'modules/data/ducks/selectors';
import { setInquiries } from 'modules/data/ducks/actions';
import { createDucks as createCriteriaDucks } from 'modules/common/criteria';
import { statusValues } from 'appConstants';

const SLICE_NAME = 'page_inquiry_list';

const rootSelector = (state) => state[SLICE_NAME];

const pageInquiriesDucks = createDucks({
  key: 'pageInquiries',
  apiName: 'pageInquiries',
  rootSelector: (state) => rootSelector(state),
  namespace: `${SLICE_NAME}`,
  sagas: {
    * beforeFulfilled(result) {
      yield put(setInquiries(result.results));
      return { result: { ...result, results: result.results.map((i) => i.objectId) } };
    },
  },
});
const pageInquiries = (params = {}) =>
  pageInquiriesDucks.actions.pageInquiries({
    ...params,
    status: [statusValues.unverified.value, statusValues.verified.value],
  });


const criteriaDucks = createCriteriaDucks({ namespace: SLICE_NAME, rootSelector });

export default {
  [SLICE_NAME]: combineReducers({
    ...pageInquiriesDucks.default,
    ...criteriaDucks.default,
  }),
};
export const actions = {
  pageInquiries,
  ...criteriaDucks.actions, // setCriteria
};
export const selectors = {
  pageInquiries: (state) => {
    const { result, ...other } = pageInquiriesDucks.selector(state);
    if (result) {
      const allInquiries = inquiriesSelector(state);
      return { ...other, result: { ...result, results: result.results.map((id) => _find(allInquiries, (i) => i.objectId === id)) } };
    }
    return { ...other };
  },
  criteria: criteriaDucks.selector,
};
export const sagas = [
  ...pageInquiriesDucks.sagas,
];