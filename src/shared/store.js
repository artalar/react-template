export class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    let subscriptions = [];
    let updatesQueue = [];
    let lastUpdate;

    const updateState = update => {
      if (update !== undefined) updatesQueue.push(update);
      this.state = updatesQueue.reduce((acc, update) => ({ ...acc, ...update }), this.state);
      updatesQueue = [];
      lastUpdate = Math.random();
      subscriptions.forEach(callback => callback(this.state));
    };

    this.merge = update => {
      updatesQueue.push(update);
      const updateStamp = (lastUpdate = Math.random());
      Promise.resolve().then(() => {
        if (updateStamp === lastUpdate) updateState();
      });
    };

    this.mergeForce = update => {
      updateState({ ...this.state, ...update });
      return this.state;
    };

    this.subscribe = callback => {
      subscriptions.push(callback);
      return () => this.unsubscribe(callback);
    };

    this.unsubscribe = deleteCallback => {
      const oldLength = subscriptions.length;
      subscriptions = subscriptions.filter(callback => callback !== deleteCallback);
      return oldLength !== subscriptions.length;
    };
  }
}
