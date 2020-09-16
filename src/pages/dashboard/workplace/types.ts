export enum PhilosopherState {
  Thinking = "Pensando...",
  Hungry = "Fome...",
  Returning = "Devolvendo...",
  Eating = "Comendo..."
}

export interface Philosopher {
  index: number;
  state: PhilosopherState;
}

export const defaultPhilosopher = (index: number): Philosopher => ({
  index,
  state: PhilosopherState.Thinking,
})

export enum ForkState {
  Free, Occupied
}

export interface Fork {
  index: number;
  state: ForkState;
  philosopher?: Philosopher;
}

export const defaultFork = (index: number): Fork => ({
  index,
  state: ForkState.Free,
})

export interface ITable {
  philosophers: Philosopher[];
  forks: Fork[];
}
