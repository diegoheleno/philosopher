import Operation from './Operation'
import State from './State'
import Result from './Result'

export default interface Stage {
  id: number;
  start: number;
  end: number;
  times: number;
  operations: Operation[];
  results: Result[];
  state: State;
}

export const defaultStage: Stage = {
  id: 0,
  start: 0,
  end: 0,
  times: 0,
  operations: [],
  results: [],
  state: State.Draft,
}
