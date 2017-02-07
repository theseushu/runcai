import { put } from 'redux-saga/effects';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';
import { setCerts } from '../../modules/data/ducks/actions';

const ducks = createDucks({
  key: 'searchMine',
  apiName: 'searchMyCerts',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(certs) {
      yield put(setCerts(certs));
    },
  },
});

// shape of ducks
// {
//   actions: { fetch },
//   default: { fetch: reducer },
//   selector rootSelector.fetch,
//   sagas,
// }

module.exports = ducks;
