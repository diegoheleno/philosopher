import React, { FunctionComponent, useEffect, useState } from 'react';
import { Row } from 'antd';
import TableElement from './TableElement';
import { Table, TableRandom, TableSemaphore } from './handler'
import { PhilosopherState } from './types';

interface PhilosopherTableProps {
  dispatch: any;
}

const PhilosopherTable: FunctionComponent<PhilosopherTableProps> = props => {
  const [table, setTable] = useState(new Table())
  const [tableRandom, setTableRandom] = useState(new TableRandom())
  const [tableSemaphore, setTableSemaphore] = useState(new TableSemaphore())
  const [log, setLog] = useState<string[]>([])

  const sleep = (miliseconds: number) =>
    new Promise((resolve: any) => setTimeout(resolve, miliseconds));

  useEffect(() => {
    if (table.deadlock())
      return

    const index = Math.floor(Math.random() * 5);
    const philosopher = table.philosophers[index]

    switch (philosopher.state) {
      case PhilosopherState.Thinking:
        philosopher.state = PhilosopherState.Hungry
        console.log(`Philosopher ${philosopher.index + 1} está com fome`)
        break

      case PhilosopherState.Hungry:
        table.take_forks(philosopher)
        break

      case PhilosopherState.Eating:
        console.log(`Philosopher ${philosopher.index + 1} acabou de comer`)
        table.put_forks(philosopher)
        console.log(`Philosopher ${philosopher.index + 1} está pensando`)
        break

      default: break
    }

    // setTable({ ...table })
    sleep(100).then(() => setTable({ ...table })).catch(error => console.log('error: ', error))
  }, [table])

  useEffect(() => {
    const index = Math.floor(Math.random() * 5);
    const philosopher = tableRandom.philosophers[index]

    switch (philosopher.state) {
      case PhilosopherState.Thinking:
        philosopher.state = PhilosopherState.Hungry
        console.log(`Philosopher ${philosopher.index + 1} está com fome`)
        break

      case PhilosopherState.Hungry:
        tableRandom.take_ruturn_forks(philosopher)
        break

      case PhilosopherState.Returning:
        tableRandom.return_forks(philosopher)
        break

      case PhilosopherState.Eating:
        console.log(`Philosopher ${philosopher.index + 1} acabou de comer`)
        tableRandom.put_forks(philosopher)
        console.log(`Philosopher ${philosopher.index + 1} está pensando`)
        break

      default: break
    }

    // setTable({ ...table })
    sleep(100).then(() => setTableRandom({ ...tableRandom })).catch(error => console.log('error: ', error))
  }, [tableRandom])

  useEffect(() => {
    if (tableSemaphore.deadlock())
      return

    const index = Math.floor(Math.random() * 5);
    const philosopher = tableSemaphore.philosophers[index]

    switch (philosopher.state) {
      case PhilosopherState.Thinking:
        philosopher.state = PhilosopherState.Hungry
        console.log(`Philosopher ${philosopher.index + 1} está com fome`)
        break

      case PhilosopherState.Hungry:
        if (tableSemaphore.getSemaphore(philosopher))
          tableSemaphore.take_forks(philosopher)
        else
          console.log(`Philosopher ${philosopher.index + 1} foi colocado na fila`)
        break

      case PhilosopherState.Eating:
        console.log(`Philosopher ${philosopher.index + 1} acabou de comer`)
        tableSemaphore.put_forks(philosopher)
        console.log(`Philosopher ${philosopher.index + 1} está pensando`)
        break

      default: break
    }
    tableSemaphore.setSemaphore()
    // setTable({ ...table })
    sleep(100).then(() => setTableSemaphore({ ...tableSemaphore })).catch(error => console.log('error: ', error))
  }, [tableSemaphore])


  return (
    <Row>
      <TableElement philosophers={table.philosophers} forks={table.forks} />
      <TableElement philosophers={tableRandom.philosophers} forks={tableRandom.forks} />
      <TableElement philosophers={tableSemaphore.philosophers} forks={tableSemaphore.forks} />
    </Row>
  );
};

export default PhilosopherTable
