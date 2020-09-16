import service from './service';
import { namespace, StageModel } from './type.d';
import { defaultStage } from '../../models/Stage';

const Model: StageModel = {
  namespace,
  state: {
    stage: defaultStage,
  },
  effects: {
    *saveStage(action, effects) {
      const { payload } = action;
      const { call } = effects;
      console.log('model', payload)
      const stage = yield call(service.stage.save, payload);
      console.log('model', stage)

      // yield put({
      //   type: 'save',
      //   payload: { stage },
      // });
    },
    *getStage(action, effects) {
      const { payload } = action;
      const { call, put } = effects;
      const stage = yield call(service.stage.get, payload);
      console.log(stage)
      yield put({
        type: 'save',
        payload: { stage },
      });
    },
    *lastStage(action, effects) {
      const { call, put } = effects;
      const stage = yield call(service.stage.last);
      console.log(stage)
      yield put({
        type: 'save',
        payload: { stage },
      });
    },
    *nextStage(action, effects) {
      const { call, put } = effects;
      const stage = yield call(service.stage.next);
      console.log(stage)
      yield put({
        type: 'save',
        payload: { stage },
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
