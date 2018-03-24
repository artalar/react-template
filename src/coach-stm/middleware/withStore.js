export class Store {
  constructor(initialState = {}) {
    this.state = initialState;

    this.merge = updates => {
      const state = this.state = { ...this.state, ...updates };
      this['@@COACH-STM/subscriptions'].forEach(callback => callback(state));
      return state;
    };

    Object.defineProperty(this, '@@COACH-STM/subscriptions', {
      value: [],
      enumerable: false,
    });

    this.subscribe = callback => {
      this['@@COACH-STM/subscriptions'].push(callback);
    };

    this.unsubscribe = deleteCallback => {
      this['@@COACH-STM/subscriptions'] = this['@@COACH-STM/subscriptions'].filter(
        callback => callback !== deleteCallback
      );
    };
  }
}
