import * as React from 'react';
import { createSubscription } from 'create-subscription';

const shallowCompare = (newObj, oldObj) => {
  const newObjKeys = Object.keys(newObj);
  const oldObjKeys = Object.keys(oldObj);
  return (
    newObjKeys.length === oldObjKeys.length && newObjKeys.every(key => newObj[key] === oldObj[key])
  );
};

export const contextFactory = (store, workflow) => {
  const { Provider: ProviderBase, Consumer } = React.createContext(store.state);

  let cachedProviderValue = { workflow, state: store.state };

  const Subscription = createSubscription({
    getCurrentValue: ({ state }) =>
      cachedProviderValue.state === state ? cachedProviderValue : { workflow, state },
    subscribe: (store, callback) => {
      store.subscribe(state =>
        callback(cachedProviderValue.state === state ? cachedProviderValue : { workflow, state })
      );
      return () => store.unsubscribe(callback);
    },
  });

  const Provider = ({ children }) => (
    <Subscription source={store}>
      {value => <ProviderBase value={value}>{children}</ProviderBase>}
    </Subscription>
  );

  const connect = selector => target => ({ children, ...props }) => {
    let updateFromParent = true;
    let cachedState = null;
    let cacheComponent = null;
    return (
      <Consumer>
        {value => {
          const state = selector(value, props);
          if (!updateFromParent && (state === cachedState || shallowCompare(state, cachedState))) {
            updateFromParent = false;
            return cacheComponent;
          } else {
            updateFromParent = false;
            cachedState = state;
            return (cacheComponent = React.createElement(target, { ...props, ...state }, children));
          }
        }}
      </Consumer>
    );
  };

  return {
    connect,
    Provider,
  };
};
