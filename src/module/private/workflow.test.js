import { withMeta } from 'coach-stm/es/middleware';
import { getMe } from './workflow';

describe('тестирование авторизации', () => {
  const testData = { data: { permissions: ['test'] } };

  const fetchGetMeMocked = () => new Promise(r => setTimeout(r, 5, testData));

  const getMeMocked = getMe.replaceMiddleware({
    ...getMe.middleware,
    api: withMeta({ api: { getMe: fetchGetMeMocked } }),
  });

  it('получение данных текущего пользователя', async () =>
    expect(await getMeMocked()).toEqual(testData.data));
});
