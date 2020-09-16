import React, { FunctionComponent, useState, useEffect } from 'react'
import { Row, InputNumber, Col, Button, Modal, Select } from 'antd';
import Stage from '../../../models/Stage'
import Result from '../../../models/Result'
import Operation from '../../../models/Operation'
import colors from '@/models/colors';
import OperationType, { operationLabel } from '@/models/OperationType';
import OperationStage from '../Operation/Operation'
import { connect } from 'umi';
import { StageState } from '../type.d';
import ResultStage from '../Result/Result';
import State from '@/models/State';
import { SyncOutlined } from '@ant-design/icons';
const { Option } = Select;

interface CalculatorStageProps {
  stage: Stage;
  dispatch: any;
}

const CalculatorStage: FunctionComponent<CalculatorStageProps> = props => {
  const [value, setValue] = useState(0);
  const [stage, setStage] = useState(props.stage);
  const [modalVisible, setModalVisible] = useState(false)
  const [operation, setOperation] = useState(OperationType.Addition);
  // const [possibilities, setPossibilities] = useState(0)

  // const calculatePossibilities = () => {
  //   setPossibilities(stage.times * stage.operations.length)
  // }

  const reset = () => {
    setStage({ ...stage, results: [], state: State.Created })
    props.dispatch({ type: 'stageModel/saveStage', payload: { ...stage, results: [], state: State.Calculating } })
  }

  const startCalculate = () => {
    setStage({ ...stage, state: State.Calculating })
  }

  const calculate = () => {
    const indexes = Array(stage.times).fill(0)
    startCalculate()

    setStage({ ...stage, results: [], state: State.Calculating })

    const calc = (value: number, operation: Operation) => {
      switch (operation.operation) {
        case OperationType.Addition:
          return operation.value + value
        case OperationType.Subtraction:
          return operation.value - value
        case OperationType.Multiplication:
          return operation.value * value
        case OperationType.Division:
          return operation.value / value
      }
    }

    const next = () => {
      for (let i = 0; i < indexes.length; i++) {
        indexes[i]++

        if (indexes[i] < stage.operations.length)
          return true

        indexes[i] = 0
      }
      return false
    }

    do {
      const result: Result = { operations: [], value: stage.start }

      indexes.map(index => {
        result.operations.push(stage.operations[index])
        result.value = calc(result.value, stage.operations[index])
      })

      stage.results.unshift(result)
      setStage(stage)
      props.dispatch({ type: 'stageModel/saveStage', payload: stage })

    } while (next())

    setStage({ ...stage })
  }

  const effects = {
    stage: {
      init: () => setStage(props.stage),
      change: (newStage: Stage) => {
        if (stage.id > 0) {
          setStage(newStage)
          props.dispatch({ type: 'stageModel/saveStage', payload: newStage })
        }
      },
      removeOperation: (remove: Operation) => {
        setStage({
          ...stage,
          operations: stage.operations.filter(operation =>
            !(operation.value === remove.value && operation.operation === remove.operation))
        })
      },
      insertNewOperation: () => effects.stage.change({ ...stage, operations: [{ operation, value }, ...stage.operations] })
    }
  };

  useEffect(effects.stage.init, [props.stage]);
  useEffect(() => console.log(stage), [stage]);

  return (
    <Col xs={24} sm={20} md={16} lg={12} style={{ padding: '20px', margin: 'auto', backgroundColor: colors.white }}>
      <Row style={{ margin: '10px' }}>Stege {stage.id}</Row>
      <Row>
        <Col xs={24} sm={8} md={8} lg={8} style={{ padding: '10px' }}>
          <Row>Start</Row>
          <InputNumber
            value={stage.start}
            style={{ width: '100%' }}
            onChange={value => effects.stage.change({ ...stage, start: parseInt(value ? value.toString() : '0') })}>
            Start
          </InputNumber>
        </Col>

        <Col xs={24} sm={8} md={8} lg={8} style={{ padding: '10px' }}>
          <Row>End</Row>
          <InputNumber
            value={stage.end}
            style={{ width: '100%' }}
            onChange={value => effects.stage.change({ ...stage, end: parseInt(value ? value.toString() : '0') })}>
            End
          </InputNumber>
        </Col>

        <Col xs={24} sm={8} md={8} lg={8} style={{ padding: '10px' }}>
          <Row>Times</Row>
          <InputNumber
            value={stage.times}
            style={{ width: '100%' }}
            onChange={value => effects.stage.change({ ...stage, times: parseInt(value ? value.toString() : '0') >= 0 ? parseInt(value ? value.toString() : '0') : 0 })}>
            Times
          </InputNumber>
        </Col>
      </Row>

      <Row style={{ padding: '10px 10px 0px 10px' }}>Buttons</Row>
      <Row align={'middle'} style={{ padding: '0px 10px' }}>
        {stage.operations.map(operation => <OperationStage onRemoveClick={() => effects.stage.removeOperation(operation)} operation={operation} />)}
        <Button
          onClick={() => setModalVisible(true)}
          style={{ margin: '10px', color: colors.white, backgroundColor: colors.blue }}>
          Novo
        </Button>

        <Modal
          title="Create New Button"
          visible={modalVisible}
          onOk={effects.stage.insertNewOperation}
          onCancel={() => setModalVisible(false)}
        >
          <Row>
            <Col span={8} style={{ padding: '5px' }}>
              <Row>Operation</Row>
              <Select
                onChange={event => setOperation(event)}
                style={{ width: '100%' }}
                defaultValue={OperationType.Addition}>{
                  Object.keys(operationLabel).map(prop =>
                    <Option value={prop}>{operationLabel[prop]}</Option>
                  )
                }</Select>
            </Col>

            <Col span={8} style={{ padding: '5px' }}>
              <Row>Value</Row>
              <InputNumber
                value={value}
                style={{ width: '100%' }}
                onChange={input => setValue(parseInt(input ? input.toString() : '0'))}
              />
            </Col>
          </Row>
        </Modal>
      </Row>

      <Row style={{ padding: '10px 10px 0px 10px' }}>Results</Row>
      <Row>
        <Col xs={24} sm={12} md={12} lg={12} style={{ padding: '10px' }}>
          <Button
            onClick={calculate}
            style={{ width: '100%', margin: '10px', color: colors.white, backgroundColor: colors.green }}>
            {stage.state === State.Calculating && <SyncOutlined spin />}
          Start Calculate
        </Button>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} style={{ padding: '10px' }}>
          <Button
            onClick={reset}
            style={{ width: '100%', margin: '10px', color: colors.white, backgroundColor: colors.red }}>
            {stage.state === State.Calculating && <SyncOutlined spin />}
          Reset Results
        </Button>
        </Col>
      </Row>
      <Row>
        {stage.results.map(result => <ResultStage end={stage.end} result={result} />)}
      </Row>
    </Col >
  )
}

export default connect(({ stageModel }: { stageModel: StageState }) => ({
  stage: stageModel.stage
}))(CalculatorStage);
