export const withMeta = externalMeta => async (payload, meta, task) => {
  meta = { ...meta, ...externalMeta };
  return await task(payload, meta);
};
