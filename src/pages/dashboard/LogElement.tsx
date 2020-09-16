import React, { FunctionComponent } from 'react'
import colors from '@/models/colors';
import { Col, Row, Tag } from 'antd';

interface LogElementProps {
  logs: string[];
}

const LogElement : FunctionComponent<LogElementProps> = props => {
  return (
    <Col>
      {props.logs.map(log => <Row><Tag>{log}</Tag></Row>)}
    </Col>
  )
}

export default LogElement
