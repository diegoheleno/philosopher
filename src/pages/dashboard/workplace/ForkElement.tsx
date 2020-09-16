import React, { FunctionComponent } from 'react'
import { Row } from 'antd';
import { Fork } from './types';
import colors from '@/models/colors';

interface ForkElementProps {
  fork: Fork;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotate?: number;
}

const ForkElement : FunctionComponent<ForkElementProps> = props => {
  return (
    <Row justify="center" style={{
      position: 'relative',
      transform: `rotate(${props.rotate}deg)`,
      top: props.top,
      right: props.right,
      bottom: props.bottom,
      left: props.left,
      width: '60px',
      height: '20px',
      margin: 'auto',
      padding: 'auto',
      border: '1px solid black',
      backgroundColor: props.fork.philosopher ? colors[props.fork.philosopher.index] : colors.white }}>
    </Row>
  )
}

export default ForkElement
