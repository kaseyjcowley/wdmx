import {Machine, MachineConfig, assign} from 'xstate';
import * as R from 'ramda';

interface Context {
  decision: string;
  hasDescription: boolean;
  description: string | null;
}

enum State {
  dataEntry = 'dataEntry',
}

interface StateSchema {
  states: {
    dataEntry: {};
  };
}

export enum EventType {
  ENTER_DECISION = 'ENTER_DECISION',
  ENTER_DESCRIPTION = 'ENTER_DESCRIPTION',
  TOGGLE_DESCRIPTION = 'TOGGLE_DESCRIPTION',
}

type Event<T extends string, P extends object = {}> = P & {
  type: T;
};

type EventSchema =
  | Event<EventType.ENTER_DECISION, {decision: string}>
  | Event<EventType.ENTER_DESCRIPTION, {description: string}>
  | Event<EventType.TOGGLE_DESCRIPTION, {checked: boolean}>;

const config: MachineConfig<Context, StateSchema, EventSchema> = {
  id: 'decisionMachine',
  initial: State.dataEntry,
  context: {
    decision: '',
    hasDescription: false,
    description: null,
  },

  states: {
    [State.dataEntry]: {
      on: {
        [EventType.ENTER_DECISION]: {
          actions: ['updateDecision'],
        },
        [EventType.TOGGLE_DESCRIPTION]: {
          actions: ['updateHasDescription'],
        },
        [EventType.ENTER_DESCRIPTION]: {
          actions: ['updateDescription'],
        },
      },
    },
  },
};

export const decisionMachine = Machine(config, {
  actions: {
    updateDecision: assign((ctx, evt) =>
      evt.type !== EventType.ENTER_DECISION
        ? ctx
        : R.assoc('decision', evt.decision, ctx),
    ),
    updateHasDescription: assign((ctx, evt) =>
      evt.type !== EventType.TOGGLE_DESCRIPTION
        ? ctx
        : R.assoc('hasDescription', evt.checked, ctx),
    ),
    updateDescription: assign((ctx, evt) =>
      evt.type !== EventType.ENTER_DESCRIPTION
        ? ctx
        : R.assoc('description', evt.description, ctx),
    ),
  },
});
