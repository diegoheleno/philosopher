import OperationType from "./OperationType"

export default interface Operation {
  operation: OperationType;
  value: number;
}
