import React, { FunctionComponent } from 'react'
import { Row } from 'antd';
import { Philosopher } from './types';
import colors from '@/models/colors';

interface PhilosopherElementProps {
  philosopher: Philosopher;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

const PhilosopherElement : FunctionComponent<PhilosopherElementProps> = props => {
  return (
    <Row justify="center" align="middle" style={{
      position: 'relative',
      top: props.top,
      right: props.right,
      bottom: props.bottom,
      left: props.left,
      width: '80px',
      height: '80px',
      margin: 'auto',
      padding: 'auto',
      color: 'white',
      borderRadius: '50%',
      border: '1px solid black',
      backgroundColor: colors[props.philosopher.index] }}>
      {props.philosopher.state}
    </Row>
  )
}

export default PhilosopherElement
