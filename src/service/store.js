export class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    this.subscriptions = [];

    this.merge = updates => {
      const state = this.state = { ...this.state, ...updates };
      this.subscriptions.forEach(callback => callback(state));
      return state;
    };

    this.subscribe = callback => {
      this.subscriptions.push(callback);
    };

    this.unsubscribe = deleteCallback => {
      this.subscriptions = this.subscriptions.filter(
        callback => callback !== deleteCallback
      );
    };
  }
}
