import { App } from '@/app';
import { AuthRoute } from '@/routes/auth.route';
import request from 'supertest';

describe('App online', () => {
  let app: App;

  beforeAll(() => {
    app = new App([new AuthRoute()]);
  });

  afterAll(async () => {
    await app.closeDatabaseConnection();
    await app.closeQueueConnections();
  });

  describe('[GET] /', () => {
    it('response statusCode 201', async () => {
      await request(app.getServer()).get('/').expect(201);
    });
  });
});
