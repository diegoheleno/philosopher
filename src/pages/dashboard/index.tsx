import React, { FunctionComponent, useEffect, useState } from 'react';
import { Col, InputNumber, Row } from 'antd';
import TableElement from './TableElement';
import { Table, TableRandom, TableSemaphore } from './handler'
import { PhilosopherState } from './types';
import LogElement from './LogElement';

interface PhilosopherTableProps {
  dispatch: any;
}

const PhilosopherTable: FunctionComponent<PhilosopherTableProps> = () => {
  const [table, setTable] = useState(new Table())
  const [tableRandom, setTableRandom] = useState(new TableRandom())
  const [tableSemaphore, setTableSemaphore] = useState(new TableSemaphore())
  const [speed, setSpeed] = useState<number>(1000)

  const sleep = (miliseconds: number | string) => {
    const value = typeof miliseconds === 'number' ? miliseconds : parseInt(miliseconds);
    return new Promise((resolve: any) => setTimeout(resolve, value));
  }

  useEffect(() => {
    console.log(table.dinners)
    if (table.deadlock()) {
      table.set_log('Deadlock :(', 5)
      table.set_log('Reiniciando...', 5)
      table.initail_state()
    }
    const index = Math.floor(Math.random() * 5);
    const philosopher = table.philosophers[index]

    switch (philosopher.state) {
      case PhilosopherState.Thinking:
        philosopher.state = PhilosopherState.Hungry
        table.set_log(`Philosopher ${philosopher.index + 1} está com fome`, philosopher.index)
        break

      case PhilosopherState.Hungry:
        table.take_forks(philosopher)
        break

      case PhilosopherState.Eating:
        table.set_log(`Philosopher ${philosopher.index + 1} acabou de comer`, philosopher.index)
        table.put_forks(philosopher)
        table.set_log(`Philosopher ${philosopher.index + 1} está pensando`, philosopher.index)
        break

      default: break
    }

    // setTable({ ...table })
    sleep(speed).then(() => setTable({ ...table })).catch(() => table.set_log('error', 5))
  }, [table])

  useEffect(() => {
    const index = Math.floor(Math.random() * 5);
    const philosopher = tableRandom.philosophers[index]

    switch (philosopher.state) {
      case PhilosopherState.Thinking:
        philosopher.state = PhilosopherState.Hungry
        tableRandom.set_log(`Philosopher ${philosopher.index + 1} está com fome`, philosopher.index)
        break

      case PhilosopherState.Hungry:
        tableRandom.take_ruturn_forks(philosopher)
        break

      case PhilosopherState.Returning:
        tableRandom.return_forks(philosopher)
        break

      case PhilosopherState.Eating:
        tableRandom.set_log(`Philosopher ${philosopher.index + 1} acabou de comer`, philosopher.index)
        tableRandom.put_forks(philosopher)
        tableRandom.set_log(`Philosopher ${philosopher.index + 1} está pensando`, philosopher.index)
        break

      default: break
    }

    sleep(speed).then(() => setTableRandom({ ...tableRandom })).catch(() => tableRandom.set_log('error'))
  }, [tableRandom])

  useEffect(() => {
    if (tableSemaphore.deadlock())
      return

    const index = Math.floor(Math.random() * 5);
    const philosopher = tableSemaphore.philosophers[index]

    switch (philosopher.state) {
      case PhilosopherState.Thinking:
        philosopher.state = PhilosopherState.Hungry
        tableSemaphore.set_log(`Philosopher ${philosopher.index + 1} está com fome`, philosopher.index)
        break

      case PhilosopherState.Hungry:
        if (tableSemaphore.getSemaphorePermission(philosopher))
          tableSemaphore.take_forks(philosopher)
        else
          tableSemaphore.set_log(`Philosopher ${philosopher.index + 1} foi colocado na fila`, philosopher.index)
        break

      case PhilosopherState.Eating:
        tableSemaphore.set_log(`Philosopher ${philosopher.index + 1} acabou de comer`, philosopher.index)
        tableSemaphore.put_forks(philosopher)
        tableSemaphore.set_log(`Philosopher ${philosopher.index + 1} está pensando`, philosopher.index)
        break

      default: break
    }

    sleep(speed).then(() => setTableSemaphore({ ...tableSemaphore })).catch(() => tableSemaphore.set_log('error', 5))
  }, [tableSemaphore])


  return (
    <>
      <Row align='middle' justify='end' style={{ margin: '20px', padding: '10px', backgroundColor: 'white', borderRadius: '10px' }}>
        Speed in miliseconds:
        <InputNumber value={speed} onChange={(value) => setSpeed(parseInt(value ? value?.toString() : ''))} style={{ margin: '10px', borderRadius: '10px' }} />
      </Row>
      <Row style={{ borderRadius: '20px'}}>
        <Col span={8} style={{ backgroundColor: 'white', padding: '20px' }}>
          <TableElement philosophers={table.philosophers} forks={table.forks} />
          <LogElement logs={table.logs} dinner={table.dinners} />
        </Col>
        <Col span={8} style={{ backgroundColor: 'white', padding: '20px' }}>
          <TableElement philosophers={tableRandom.philosophers} forks={tableRandom.forks} />
          <LogElement logs={tableRandom.logs} dinner={tableRandom.dinners} />
        </Col>
        <Col span={8} style={{ backgroundColor: 'white', padding: '20px' }}>
          <TableElement philosophers={tableSemaphore.philosophers} forks={tableSemaphore.forks} />
          <LogElement logs={tableSemaphore.logs} dinner={tableSemaphore.dinners} />
        </Col>
      </Row>
    </>
  );
};

export default PhilosopherTable
