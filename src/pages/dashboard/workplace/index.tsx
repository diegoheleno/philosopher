import React, { FunctionComponent, useEffect, useState } from 'react';
import { Row } from 'antd';
import TableElement from './TableElement';
import { Table } from './handler'
import { PhilosopherState } from './types';

interface PhilosopherTableProps {
  dispatch: any;
}

const PhilosopherTable: FunctionComponent<PhilosopherTableProps> = props => {
  const [table1, setTable1] = useState(new Table())
  const [table2, setTable2] = useState(new Table())
  const [table3, setTable3] = useState(new Table())
  const [log, setLog] = useState<string[]>([])

  const sleep = (miliseconds: number) =>
    new Promise((resolve: any) => setTimeout(resolve, miliseconds));

    useEffect(() => {
      if (table1.deadlock())
        return

      const index = Math.floor(Math.random() * 5);
      const philosopher = table1.philosophers[index]

      switch (philosopher.state) {
        case PhilosopherState.Thinking:
          philosopher.state = PhilosopherState.Hungry
          console.log(`Philosopher ${philosopher.index + 1} está com fome`)
          break

        case PhilosopherState.Hungry:
          table1.take_forks(philosopher)
          break

        case PhilosopherState.Eating:
          console.log(`Philosopher ${philosopher.index + 1} acabou de comer`)
          table1.put_forks(philosopher)
          console.log(`Philosopher ${philosopher.index + 1} está pensando`)
          break

        default: break
      }

      // setTable({ ...table })
      sleep(100).then(() => setTable1({ ...table1 })).catch(error => console.log('error: ', error))
    }, [table1])

  useEffect(() => {
    const index = Math.floor(Math.random() * 5);
    const philosopher = table2.philosophers[index]

    switch (philosopher.state) {
      case PhilosopherState.Thinking:
        philosopher.state = PhilosopherState.Hungry
        console.log(`Philosopher ${philosopher.index + 1} está com fome`)
        break

      case PhilosopherState.Hungry:
      case PhilosopherState.Returning:
        table2.take_forks(philosopher)
        break

      case PhilosopherState.Eating:
        console.log(`Philosopher ${philosopher.index + 1} acabou de comer`)
        table2.put_forks(philosopher)
        console.log(`Philosopher ${philosopher.index + 1} está pensando`)
        break

      default: break
    }

    // setTable({ ...table })
    sleep(100).then(() => setTable2({ ...table2 })).catch(error => console.log('error: ', error))
  }, [table2])

  useEffect(() => {
    if (table3.deadlock())
      return

    const index = Math.floor(Math.random() * 5);
    const philosopher = table3.philosophers[index]

    switch (philosopher.state) {
      case PhilosopherState.Thinking:
        philosopher.state = PhilosopherState.Hungry
        console.log(`Philosopher ${philosopher.index + 1} está com fome`)
        break

      case PhilosopherState.Hungry:
        table3.take_forks(philosopher)
        break

      case PhilosopherState.Eating:
        console.log(`Philosopher ${philosopher.index + 1} acabou de comer`)
        table3.put_forks(philosopher)
        console.log(`Philosopher ${philosopher.index + 1} está pensando`)
        break

      default: break
    }

    // setTable({ ...table })
    sleep(100).then(() => setTable3({ ...table3 })).catch(error => console.log('error: ', error))
  }, [table3])


  return (
    <Row>
      <TableElement philosophers={table1.philosophers} forks={table1.forks} />
      <TableElement philosophers={table2.philosophers} forks={table2.forks} />
      <TableElement philosophers={table3.philosophers} forks={table3.forks} />
    </Row>
  );
};

export default PhilosopherTable
