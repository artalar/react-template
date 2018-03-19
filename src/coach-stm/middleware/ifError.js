export const ifError = callback => async (payload, meta, task) => {
  try {
    payload = await task(payload, meta);
    return payload;
  } catch (e) {
    callback(e);
    throw e;
  }
};
