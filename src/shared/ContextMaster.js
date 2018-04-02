import * as React from 'react';
import { Coach } from 'coach-stm/lib';
import middleware, { withMeta } from 'coach-stm/es/middleware';

import { contextFactory } from 'shared/contextFactory';
import { Store } from 'shared/store';

const initialState = {
  providers: {},
};

const allContextStore = new Store(initialState);

const coach = new Coach({
  middleware: {
    store: withMeta({ store: allContextStore }),
    ...middleware,
  },
});

export const contextConnectors = {};

export const addContext = coach.goal('add provider', [
  ({ name, store, workflow }, { store: ownStore }) => {
    const { connect, Provider } = contextFactory(store, workflow);

    ownStore.merge({ providers: { ...ownStore.state.providers, [name]: { connect, Provider } } });

    Object.defineProperty(contextConnectors, name, {
      get() {
        return allContextStore.state.providers[name].connect;
      },
    });
  },
]);

export const ContextMaster = ({ children }) => {
  const { providers } = allContextStore.state;
  return Object.keys(providers).reduce(
    (master, providerName) =>
      React.createElement(providers[providerName].Provider, { name: providerName }, master),
    children
  );
};
