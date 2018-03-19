const executor = async ({ description, tasks, tasksNames, instanceId, payload, processId }) => {
  const tasksCount = tasks.length;

  for (let taskIndex = 0; taskIndex < tasksCount; taskIndex++) {
    const meta = {
      description,
      instanceId,
      processId,
      tasksCount,
      taskIndex,
      taskName: tasksNames[taskIndex],
    };

    payload = await tasks[taskIndex](payload, meta);
  }

  return payload;
};

const compose = (theMiddleware, task) => (payload, meta) => theMiddleware(payload, meta, task);

export const missedProperty = new Error('property missed');

const mergeRecursive = (object, history, payload) => {
  if (history.length === 0) {
    return { ...object, ...payload };
  }
  const nextKey = history.shift();
  return { ...object, [nextKey]: mergeRecursive(object[nextKey], history, payload) };
};

const getSetter = (object, history, updateState) => {
  return Object.keys(object).reduce((acc, key) => {
    return Object.defineProperty(acc, key, {
      get: function() {
        const value = object[key];
        if (typeof value === 'object' && value !== null) {
          return getSetter(value, history.concat(key), updateState);
        } else {
          throw missedProperty;
        }
      },
    });
  }, updateState(history));
};

export class Coach {
  constructor({ state = {}, middleware = [] } = {}) {
    this.subscriptions = [];
    this.state = state;
    this.middleware = middleware;
  }

  get offerState() {
    return getSetter(this.state, [], history => updater => payload => {
      this.updateState(history)(updater);
      return payload;
    });
  }

  setState = state => {
    this.state = { ...this.state, ...state };
    this.subscriptions.forEach(callback => callback(this.state));
  };

  updateState = history => payload => {
    const newState = mergeRecursive(this.state, history, payload);
    if (this.state !== newState) this.subscriptions.forEach(callback => callback(newState));

    return (this.state = newState);
  };

  subscribe = callback => {
    this.subscriptions.push(callback);
  };
  unsubscribe = deletingCallback => {
    this.subscriptions = this.subscriptions.filter(callback => callback !== deletingCallback);
  };

  indent(callback) {
    return (payload, meta) => {
      callback(payload, meta);
      return payload;
    };
  }

  withMiddleware(middleware) {
    return task =>
      middleware.reduceRight((acc, theMiddleware) => {
        const f = compose(theMiddleware, acc);
        f._cStmTaskName = task._cStmTaskName || task.name;
        return f;
      }, task);
  }

  newGoal = ({ middleware, description, tasks, tasksNames }) => {
    tasks = tasks.map(this.withMiddleware(middleware));

    const instanceId = Symbol();

    const goal = payload =>
      executor({
        description,
        tasks,
        tasksNames,
        instanceId,
        payload,
        processId: Symbol(),
      });

    goal.withMiddleware = middleware =>
      this.newGoal({ middleware, description, tasks, tasksNames });

    return goal;
  };

  goal(description, tasks = { indent: this.indent }) {
    // description not specified
    if (typeof description === 'object') {
      tasks = description;
      description = '';
    }

    const tasksNames = [];

    tasks = Object.keys(tasks).map(key => {
      tasksNames.push(key);
      return this.withMiddleware(this.middleware)(tasks[key]);
    });

    return this.newGoal({ middleware: [], description, tasks, tasksNames });
  }
}
