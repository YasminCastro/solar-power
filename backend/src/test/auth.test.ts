import { App } from '@/app';
import { UserModel } from '@/models/users.models';
import { AuthRoute } from '@/routes/auth.route';
import request from 'supertest';

describe('Auth Router', () => {
  let app: App;
  let authRoute: AuthRoute;
  const email = 'test@example.com';
  const password = '123456789';

  beforeAll(async () => {
    authRoute = new AuthRoute();
    app = new App([authRoute]);

    await UserModel.deleteOne({ email });
  });

  afterAll(async () => {
    await UserModel.deleteOne({ email });

    await app.closeDatabaseConnection();
    await app.closeQueueConnections();
  });

  describe('[POST] /signup', () => {
    it('response should return status 201 with token and user data', async () => {
      const userData = {
        email,
        password,
        name: 'Test',
      };

      const response = await request(app.getServer()).post('/signup').send(userData);

      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.name).toBe(userData.name);
    });
  });

  describe('[POST] /login', () => {
    it('response should return status 200 with token and user data', async () => {
      const userData = {
        email,
        password,
      };

      const response = await request(app.getServer()).post('/login').send(userData);
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe(userData.email);
    });
  });
});
