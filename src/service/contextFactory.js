import * as React from 'react';

const shallowCompare = (newObj, oldObj) => {
  const oldObjKeys = Object.keys(oldObj);
  const newObjKeys = Object.keys(newObj);
  return (
    oldObjKeys.length === newObjKeys.length &&
    oldObjKeys.every(key => oldObjKeys[key] === newObjKeys[key])
  );
};

export const contextFactory = (name, Component) => {
  const { Provider: ProviderBase, Consumer } = React.createContext(name);

  class Provider extends Component {
    render() {
      return <ProviderBase value={this.state}>{this.props.children}</ProviderBase>;
    }
  }

  const connect = selector => target => ({ children, ...props }) => {
    let updateFromParent = true;
    let cachedState = null;
    let cacheComponent = null;
    return (
      <Consumer>
        {value => {
          const state = selector(value);
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
