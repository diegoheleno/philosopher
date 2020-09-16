import { Effect, Reducer } from 'umi';
import Stage from '../../models/Stage';

export const namespace = 'stageModel';

export interface StageState {
  stage: Stage;
}

export interface StageModel {
  namespace: string;
  state: StageState;
  effects: {
    saveStage: Effect;
    getStage: Effect;
    lastStage: Effect;
    nextStage: Effect;
  };
  reducers: { save: Reducer<StageState> };
}

export interface CurrentUser {
  userid: string;
  userName: string;
  userEmail: string;
  rubric?: string;
}

export enum StageEffect {
  SaveStage = 'saveStage',
  GetStage = 'getStage',
  LastStage = 'lastStage',
  NextStage = 'nextStage',
}

export enum StageReducer {
  Save = 'save',
}

export enum StageDispatch {
  SaveStage = `${namespace}/${StageEffect.SaveStage}`,
  GetStage = `${namespace}/${StageEffect.GetStage}`,
  LastStage = `${namespace}/${StageEffect.LastStage}`,
  NextStage = `${namespace}/${StageEffect.NextStage}`,
  Save = `${namespace}/${StageReducer.Save}`,
}

export const dispatcherFactory = (dispatch: any) => {
  return {
    saveStage: (stage: Stage) => {
      dispatch({
        type: StageDispatch.SaveStage,
        payload: stage,
      });
    },
    getStage: (id: number) => {
      dispatch({
        type: StageDispatch.GetStage,
        payload: id,
      });
    },
    lastStage: () => {
      dispatch({
        type: StageDispatch.LastStage,
      });
    },
    nextStage: () => {
      dispatch({
        type: StageDispatch.NextStage,
      });
    },
  };
};
