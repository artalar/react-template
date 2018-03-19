const workingTasks = new Map();

export const rejectedByRaceCondition = new Error("rejected by race condition");

export const preventRaceCondition = async (payload, meta, task) => {
  const { instanceId, taskIndex, processId } = meta;
  if (taskIndex === 0) {
    workingTasks.set(instanceId, processId);
  }
  if (workingTasks.get(instanceId) !== processId) {
    throw rejectedByRaceCondition;
  }
  return await task(payload, meta);
};