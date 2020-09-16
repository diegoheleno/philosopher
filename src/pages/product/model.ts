import service from './service';
import { namespace, ProductModel } from './data.d';

const Model: ProductModel = {
  namespace,
  state: {
    products: undefined,
  },
  effects: {
    *init(_, { put }) {
      yield put({ type: 'queryProduct' });
    },
    *addProduct(action, effects) {
      const { payload } = action;
      const { call, put } = effects;
      const products = yield call(service.addProduct, payload);

      yield put({
        type: 'save',
        payload: { products },
      });
    },
    *queryProduct(action, effects) {
      const { call, put } = effects;
      const products = yield call(service.queryProduct);
      yield put({
        type: 'save',
        payload: { products },
      });
    },
    *updateProduct(action, effects) {
      const { payload } = action;
      const { call, put } = effects;
      yield call(service.updateProduct, payload);
      const products = yield call(service.queryProduct);

      yield put({
        type: 'save',
        payload: { products },
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
