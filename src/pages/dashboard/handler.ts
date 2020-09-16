import { defaultFork, defaultPhilosopher, Fork, ForkState, ITable, Philosopher, PhilosopherState } from "./types";

const total = 5

export class Table implements ITable {
  readonly philosophers: Philosopher[];
  readonly forks: Fork[];
  readonly logs: string[] = [];

  constructor() {
    this.philosophers = [0, 1, 2, 3, 4].map((_, index) => defaultPhilosopher(index))
    this.forks = [0, 1, 2, 3, 4].map((item: any, index: number) => defaultFork(index))
  }

  public readonly set_log = (log: string) => {
    this.logs.unshift(log)
  }

  public get_forks = ({ index }: Philosopher) =>
    [this.forks[index], this.forks[index - 1 >= 0 ? index - 1 : total - 1]]

  public set_fork = (philosopher: Philosopher, fork: Fork) => {
    if (!fork.philosopher || fork.philosopher.index === philosopher.index) {
      fork.philosopher = philosopher
      fork.state = ForkState.Occupied
      return true
    }
    return false
  }

  public remove_fork = (philosopher: Philosopher, fork: Fork) => {
    if (philosopher.index === fork.philosopher?.index) {
      fork.philosopher = undefined
      fork.state = ForkState.Free
    }
  }

  public readonly take_forks = (philosopher: Philosopher) => {
    const [rightFork, leftFork] = this.get_forks(philosopher)
    const tookLeft = this.set_fork(philosopher, leftFork)
    const tookRigth = this.set_fork(philosopher, rightFork)

    if (tookLeft && tookRigth) {
      this.set_log(`Philosopher ${philosopher.index + 1} começou a comer`)
      return philosopher.state = PhilosopherState.Eating
    }

    if (tookLeft) {
      this.set_log(`Philosopher ${philosopher.index + 1} pegou o garfo esquerdo e está esperando o direito ficar livre`)
      return philosopher.state = PhilosopherState.Hungry
    }

    if (tookRigth) {
      this.set_log(`Philosopher ${philosopher.index + 1} pegou o garfo direito e está esperando o esquerdo ficar livre`)
      return philosopher.state = PhilosopherState.Hungry
    }
    this.set_log(`Philosopher ${philosopher.index + 1} não pegou nenhum garfo :(`)
    return philosopher.state = PhilosopherState.Hungry
  }

  public readonly put_forks = (philosopher: Philosopher) => {
    const [rightFork, leftFork] = this.get_forks(philosopher)

    this.remove_fork(philosopher, leftFork)
    this.remove_fork(philosopher, rightFork)

    philosopher.state = PhilosopherState.Thinking
  }

  public readonly deadlock = () => {
    return this.philosophers.every(philosopher => philosopher.state === PhilosopherState.Hungry) && this.forks.every(fork => fork.philosopher)
  }
}


export class TableRandom extends Table {
  constructor() {
    super();
  }

  public return_forks = (philosopher: Philosopher) => {
    const [rightFork, leftFork] = this.get_forks(philosopher)

    if (philosopher.state === PhilosopherState.Returning) {
      this.remove_fork(philosopher, rightFork)
      this.remove_fork(philosopher, leftFork)
      philosopher.state = PhilosopherState.Hungry
      this.set_log(`Philosopher ${philosopher.index + 1} devolveu o garfo`)
      return
    }
  }

  public readonly take_ruturn_forks = (philosopher: Philosopher) => {
    const [rightFork, leftFork] = this.get_forks(philosopher)
    const tookLeft = this.set_fork(philosopher, leftFork)
    const tookRigth = this.set_fork(philosopher, rightFork)

    if (tookLeft && tookRigth) {
      this.set_log(`Philosopher ${philosopher.index + 1} começou a comer`)
      return philosopher.state = PhilosopherState.Eating
    }

    if (tookLeft) {
      this.set_log(`Philosopher ${philosopher.index + 1} pegou o garfo esquerdo e está esperando o direito ficar livre`)
      return philosopher.state = PhilosopherState.Returning
    }

    if (tookRigth) {
      this.set_log(`Philosopher ${philosopher.index + 1} pegou o garfo direito e está esperando o esquerdo ficar livre`)
      return philosopher.state = PhilosopherState.Returning
    }
    this.set_log(`Philosopher ${philosopher.index + 1} não pegou nenhum garfo :(`)
    return philosopher.state = PhilosopherState.Returning
  }
}

export class TableSemaphore extends Table {
  constructor() {
    super();
  }

  public getSemaphorePermission = (philosopher: Philosopher): boolean => {
    const { index } = philosopher
    const [ next, previous ] = [index + 1 < 5 ? index + 1 : 0, index - 1 >= 0 ? index - 1 : 4]
    return this.philosophers[next].state !== PhilosopherState.Eating &&
           this.philosophers[previous].state !== PhilosopherState.Eating
  }
}

// const philosopheze = async (index: number) => {

//   const table = new Table()

//   const sleep = (miliseconds: number) =>
//     new Promise((resolve: any) => setTimeout(resolve, miliseconds));
//     await sleep(2000);

//   while (true) {
//     // const index = Math.floor(Math.random() * total);
//     const philosopher = table.philosophers[index]

//     switch (philosopher.state) {
//       case PhilosopherState.Thinking:
//         philosopher.state = PhilosopherState.Hungry
//         this.set_log(`Philosopher ${philosopher.index + 1} está com fome`)
//         break

//       case PhilosopherState.Hungry:
//         table.take_forks(philosopher)
//         break

//       case PhilosopherState.Eating:
//         this.set_log(`Philosopher ${philosopher.index + 1} acabou de comer`)
//         table.put_forks(philosopher)
//         this.set_log(`Philosopher ${philosopher.index + 1} está pensando`)
//         break

//       default: break
//     }
//   }
// }
