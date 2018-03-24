export const ifError = callback => async (payload, meta, task) => {
  try {
    return await task(payload, meta);
  } catch (e) {
    callback(e);
    throw e;
  }
};
