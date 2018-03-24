import * as React from 'react';

const shallowCompare = (newObj, oldObj) => {
  const newObjKeys = Object.keys(newObj);
  const oldObjKeys = Object.keys(oldObj);
  return (
    newObjKeys.length === oldObjKeys.length && newObjKeys.every(key => newObj[key] === oldObj[key])
  );
};

export const contextFactory = (name, coach, goals) => {
  const { state, subscribe, unsubscribe } = coach;
  const { Provider: ProviderBase, Consumer } = React.createContext(name);

  class Provider extends React.Component {
    state = state;
    componentDidMount() {
      subscribe(this.subscribtion);
    }

    componentWillUnmount() {
      unsubscribe(this.subscribtion);
    }

    subscribtion = state => this.setState(state);

    render() {
      return (
        <ProviderBase value={{ ...goals, state: this.state }}>{this.props.children}</ProviderBase>
      );
    }
  }

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
