import service from './service';
import { namespace, SellerModel } from './data.d';

const Model: SellerModel = {
  namespace,
  state: {
    sellers: undefined,
  },
  effects: {
    *init(_, { put }) {
      yield put({ type: 'querySeller' });
    },
    *addSeller(action, effects) {
      const { payload } = action;
      const { call, put } = effects;
      const sellers = yield call(service.addSeller, payload);

      yield put({
        type: 'save',
        payload: { sellers },
      });
    },
    *querySeller(action, effects) {
      const { call, put } = effects;
      const sellers = yield call(service.querySeller);
      yield put({
        type: 'save',
        payload: { sellers },
      });
    },
    *querySellerByIdVtex(action, effects) {
      const { payload } = action;
      const { call, put } = effects;
      const sellers = yield call(service.querySellerByIdVtex, payload);
      yield put({
        type: 'save',
        payload: { sellers },
      });
    },
    *removeSeller(action, effects) {
      const { payload } = action;
      const { call, put } = effects;
      const sellers = yield call(service.removeSeller, payload);

      yield put({
        type: 'save',
        payload: { sellers },
      });
    },
    *updateSeller(action, effects) {
      const { payload } = action;
      const { call, put } = effects;
      const sellers = yield call(service.updateSeller, payload);

      yield put({
        type: 'save',
        payload: { sellers },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
