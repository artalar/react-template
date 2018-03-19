import { BaseEmitter } from 'kuker-emitters';

const emit = BaseEmitter();

export const kukerEmitter = async (payload, meta, task) => {
  const { description, taskIndex, tasksCount } = meta;
  const taskName = `"${meta.taskName}" `;
  const goalName = description === undefined ? '' : `"${description}" `;
  if (taskIndex === 0) {
    emit({
      kuker: true,
      type: goalName,
      origin: 'coach-stm',
      label: `Goal ${goalName}[start]`,
      state: { payload, meta },
      color: '#f9dabf',
    });
  }
  emit({
    kuker: true,
    type: goalName,
    origin: 'coach-stm',
    label: `Task #${taskIndex} ${taskName}[start]`,
    state: { payload, meta },
    color: '#f3e3d9',
  });
  try {
    payload = await task(payload, meta);
  } catch (e) {
    emit({
      kuker: true,
      type: goalName,
      origin: 'coach-stm',
      label: `Task #${taskIndex} ${taskName}[error]`,
      state: { payload, meta, error: e.message },
      color: '#ff6464',
    });
    emit({
      kuker: true,
      type: goalName,
      origin: 'coach-stm',
      label: `Goal ${goalName}[error]`,
      state: { payload, meta, error: e.message },
      color: '#ff6464',
    });

    throw e;
  }
  emit({
    kuker: true,
    type: goalName,
    origin: 'coach-stm',
    label: `Task #${taskIndex} ${taskName}[end]`,
    state: { payload, meta },
    color: '#f3e3d9',
  });
  if (taskIndex === tasksCount - 1) {
    emit({
      kuker: true,
      type: goalName,
      origin: 'coach-stm',
      label: `Goal ${goalName}[end]`,
      state: { payload, meta },
      color: '#f9dabf',
    });
  }
  return payload;
};
