import { call, put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { actions as dataActions } from '../data';
import { namespace, selector as rootSelector } from './constants';
import { quitConversation } from '../../api/leancloud';

const { setCurrentConversation, removeConversation } = dataActions;

const ducks = createDucks({
  key: 'quit',
  apiName: null,
  rootSelector: (state) => rootSelector(state),
  namespace,
  sagas: {
    * api(api, { objectId }) {
      return yield call(quitConversation, objectId);
    },
    * beforeFulfilled(objectId) {
      yield put(removeConversation(objectId));
      yield put(setCurrentConversation(null));
    },
  },
});
module.exports = ducks;
