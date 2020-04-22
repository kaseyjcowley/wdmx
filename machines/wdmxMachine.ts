import {Machine, MachineConfig} from 'xstate';

type Choice = string;
type FactorWeightPair = [string, number];

enum State {
  decision = 'decision',
  choices = 'choices',
  factors = 'factors',
}

enum Event {
  NAVIGATE_TO_CHOICES = 'NAVIGATE_TO_CHOICES',
  NAVIGATE_TO_FACTORS = 'NAVIGATE_TO_FACTORS',
}

interface Context {
  decision: string;
  description: string | null;
  choices: Choice[];
  factors: FactorWeightPair[];
}

interface StateSchema {
  states: {
    decision: {};
    choices: {};
    factors: {};
  };
}

type EventSchema =
  | {type: Event.NAVIGATE_TO_CHOICES}
  | {type: Event.NAVIGATE_TO_FACTORS};

const config: MachineConfig<Context, StateSchema, EventSchema> = {
  id: 'wdmxMachine',
  initial: State.decision,
  context: {
    decision: '',
    description: null,
    choices: [],
    factors: [],
  },
  states: {
    decision: {},
    choices: {},
    factors: {},
  },
};

export const wdmxMachine = Machine(config);
