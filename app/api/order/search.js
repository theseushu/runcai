import { put } from 'redux-saga/effects';
import { setOrders } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'search',
  apiName: 'searchOrders',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(orders) {
      yield put(setOrders(orders));
    },
  },
});

module.exports = ducks;
