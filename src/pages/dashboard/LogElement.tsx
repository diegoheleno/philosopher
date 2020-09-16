import React, { FunctionComponent } from 'react'
import { Col, Row, Tag } from 'antd';
import { Log } from './types';
import colors from '@/models/colors';

interface LogElementProps {
  logs: Log[];
  dinner: number;
  semaphores?: boolean[];
}

const LogElement: FunctionComponent<LogElementProps> = props => {
  return (
    <Col>
      {props.semaphores && <Row><span>Estado do semáfaro: </span></Row>}
      {props.semaphores?.map((semaphore, index) =>
        <Row style={{ display: 'flex' }}>
          <Tag
            style={{ display: 'flex', flexGrow: 1 }}
            color={semaphore ? colors.green : colors.red}>
            Philosopher {index + 1}
          </Tag>
        </Row>
      )}
      <Row style={{ marginTop: '10px' }}><span>{props.dinner} refeições feitas</span></Row>
      {props.logs.map(log =>
        <Row style={{ display: 'flex' }} >
          <Tag style={{ display: 'flex', flexGrow: 1 }} color={log.color}>{log.message}</Tag>
        </Row>
      )}
    </Col>
  )
}

export default LogElement
