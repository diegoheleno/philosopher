import React, { FunctionComponent } from 'react'
import { Col, Row, Tag } from 'antd';
import { Log } from './types';

interface LogElementProps {
  logs: Log[];
  dinner: number;
}

const LogElement : FunctionComponent<LogElementProps> = props => {
  return (
    <Col>
      <Row><span>{props.dinner} refeições feitas</span></Row>
      {props.logs.map(log =>
        <Row style={{ display: 'flex' }} >
          <Tag style={{ display: 'flex', flexGrow: 1 }} color={log.color}>{log.message}</Tag>
        </Row>
      )}
    </Col>
  )
}

export default LogElement
