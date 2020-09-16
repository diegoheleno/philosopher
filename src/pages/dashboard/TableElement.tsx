import React, { FunctionComponent } from 'react'
import { Row } from 'antd';
import colors from '@/models/colors';
import PhilosopherElement from './PhilosopherElement';
import ForkElement from './ForkElement';
import { Fork, Philosopher } from './types';

interface TableElementProps {
  forks: Fork[];
  philosophers: Philosopher[];
}

const TableElement : FunctionComponent<TableElementProps> = props => {
  return (
    <Row style={{
      width: '300px',
      height: '300px',
      margin: '50px auto',
      padding: 'auto',
      borderRadius: '50%',
      backgroundColor: colors.lightgray,
      border: '1px solid black'
    }}>
      <PhilosopherElement philosopher={props.philosophers[0]} bottom="70px" left="100px" />
      <PhilosopherElement philosopher={props.philosophers[1]} left="140px" top="40px" />
      <PhilosopherElement philosopher={props.philosophers[2]} top="200px" />
      <PhilosopherElement philosopher={props.philosophers[3]} top="80px" left="10px" />
      <PhilosopherElement philosopher={props.philosophers[4]} right="120px" bottom="70px" />
      <ForkElement fork={props.forks[0]} left="10px" bottom="130px" rotate={135} />
      <ForkElement fork={props.forks[1]} rotate={10} />
      <ForkElement fork={props.forks[2]} left="100px" bottom="0px" rotate={90} />
      <ForkElement fork={props.forks[3]} left="-120px" bottom="90px" rotate={160} />
      <ForkElement fork={props.forks[4]} left="-180px" bottom="210px" rotate={40}/>
    </Row>
  )
}

export default TableElement
