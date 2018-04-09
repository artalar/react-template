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

const contextConnectors = {};
contextConnectors.prototype = Object.keys(CONTEXT).reduce((acc, contextName) => {
  Object.defineProperty(acc, contextName, {
    get() {
      console.error(new Error(`Context "${contextName}" is not set yet`));
      return (/* selector */) => (/* Component */) => null;
    },
  });
  return acc;
}, {});

const createContext = ({ name, store, workflow }) => ({ name, ...contextFactory(store, workflow) });

const setNewContextProvider = ({ name, connect, Provider }, { store }) =>
  void store.merge({ providers: { ...store.state.providers, [name]: { connect, Provider } } });

const setNewContextConnect = ({ name }) =>
  Object.assign(contextConnectors, {
    get [name]() {
      return allContextStore.state.providers[name].connect;
    },
  });

const addContext = coach.goal('add provider', {
  createContext,
  setNewContextProvider,
  setNewContextConnect,
});

const ContextMaster = ({ children }) => {
  const { providers } = allContextStore.state;
  return Object.keys(providers).reduce(
    (master, providerName) =>
      React.createElement(providers[providerName].Provider, { name: providerName }, master),
    children
  );
};

export { ContextMaster, addContext, contextConnectors };