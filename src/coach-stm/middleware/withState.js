export const withState = context => async (payload, meta, task) => {
  meta.state = context.state;
  return await task(payload, meta);
};
