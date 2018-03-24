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

const withMiddleware = middleware => task =>
  Object.values(middleware).reduceRight((acc, theMiddleware) => compose(theMiddleware, acc), task);

const createGoal = goalSettings => {
  const { description, tasks, tasksNames, middleware } = goalSettings;
  const tasksWithMiddleware = tasks.map(withMiddleware(middleware));

  const instanceId = Symbol();

  const goal = payload =>
    executor({
      description,
      tasks: tasksWithMiddleware,
      tasksNames,
      instanceId,
      payload,
      processId: Symbol(),
    });

  goal.middleware = Object.freeze(middleware);
  goal.replaceMiddleware = (middleware = {}) => createGoal({ ...goalSettings, middleware });

  return goal;
};

export const indent = callback => async (payload, meta) => {
  await callback(payload, meta);
  return payload;
};

export class Coach {
  constructor({ middleware = {} } = {}) {
    Object.defineProperty(this, 'middleware', {
      value: Object.freeze(middleware),
      configurable: false,
      enumerable: false,
      writable: false,
    });
  }

  goal(description, tasks = { indent: indent }) {
    // description not specified
    if (typeof description === 'object') {
      tasks = description;
      description = '';
    }

    const tasksNames = [];
    tasks = Object.keys(tasks).map(key => {
      tasksNames.push(key);
      return tasks[key];
    });

    return createGoal({
      description,
      tasks,
      tasksNames,
      middleware: this.middleware,
    });
  }
}
