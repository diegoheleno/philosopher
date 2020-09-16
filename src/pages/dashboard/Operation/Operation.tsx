import React, { FunctionComponent } from 'react'
import Operarion from '../../../models/Operation';
import { PlusOutlined, VerticalAlignMiddleOutlined, CloseOutlined, MinusOutlined } from "@ant-design/icons"
import { connect } from 'umi';
import { Button } from 'antd';
import colors from '@/models/colors';

export const operationIcon = {
  Addition: <PlusOutlined />,
  Subtraction: <MinusOutlined />,
  Division: <VerticalAlignMiddleOutlined />,
  Multiplication: <CloseOutlined />,
}

interface OperarionStageProps {
  operation: Operarion;
  onRemoveClick?: () => void;
}

const OperationStage : FunctionComponent<OperarionStageProps> = props => {
  const { operation, onRemoveClick } = props;

  return (
    <Button
      onClick={onRemoveClick}
      style={{ backgroundColor: colors.orange, color: colors.white, padding: '0 5px'}}>
      <span>{operationIcon[operation.operation]}</span>
      <span style={{marginLeft: '5px'}}>{operation.value}</span>
    </Button>
  )
}

export default connect()(OperationStage);
