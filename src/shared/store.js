export class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    let subscriptions = [];

    this.merge = updates => {
      const state = this.state = { ...this.state, ...updates };
      subscriptions.forEach(callback => callback(state));
      return state;
    };

    this.subscribe = callback => {
      subscriptions.push(callback);
    };

    this.unsubscribe = deleteCallback => {
      subscriptions = subscriptions.filter(
        callback => callback !== deleteCallback
      );
    };
  }
}
