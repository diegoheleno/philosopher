import React, { FunctionComponent } from 'react'
import { Row, Button } from 'antd';
import Result from '../../../models/Result';
import OperationStage from '../Operation/Operation';
import colors from '@/models/colors';
import { PauseOutlined } from '@ant-design/icons';

interface ResultStageProps {
  end: number;
  result: Result;
}

const ResultStage : FunctionComponent<ResultStageProps> = props => {
  const { end, result } = props;

  return (
    <Row style={{ padding: '0px 10px' }}>
      {result.operations.map(operation => <OperationStage operation={operation}/>)}
      <Button
        style={{ backgroundColor: end === result.value ? colors.green : colors.red, color: colors.white, padding: '0 5px'}}>
        <span><PauseOutlined rotate={90} /></span>
        <span style={{marginLeft: '5px'}}>{result.value}</span>
      </Button>
    </Row>
  )
}

export default ResultStage
