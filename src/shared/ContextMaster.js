import * as React from 'react';
import { Coach } from 'coach-stm/lib';
import middleware, { withMeta } from 'coach-stm/es/middleware';

import { CONTEXT } from 'shared/reference';
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
contextConnectors.prototype = Object.keys(CONTEXT).reduce((acc, contextName) => {
  Object.defineProperty(acc, contextName, {
    get() {
      console.error(new Error(`Context "${contextName}" is not set yet`));
      return (/* selector */) => Component => Component;
    },
  });
  return acc;
}, {});

export const addContext = coach.goal('add provider', [
  ({ name, store, workflow }, { store: ownStore }) => {
    const { connect, Provider } = contextFactory(store, workflow);

    ownStore.merge({ providers: { ...ownStore.state.providers, [name]: { connect, Provider } } });
    Object.assign(contextConnectors, {
      get [name]() {
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
