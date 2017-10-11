import { createAction } from 'redux-act';

export const createAsyncAction = (description, asyncFunction) =>
  createAction(description, (...args) => ({
    ...args,
    reduxActDispatchFreeAsyncAction: store => asyncFunction(store)(...args),
  }));

export const asyncActionsCallerMiddleware = store => next => action => {
  if (
    action.payload !== undefined &&
    action.payload.reduxActDispatchFreeAsyncAction !== undefined
  ) {
    action.payload.reduxActDispatchFreeAsyncAction(store);
    action.payload = Object.keys(action.payload).reduce(
      (payload, key) =>
        key === 'reduxActDispatchFreeAsyncAction'
          ? payload
          : { ...payload, [key]: action.payload[key] },
      {}
    );
    return next(action);
  }
  return next(action);
};
