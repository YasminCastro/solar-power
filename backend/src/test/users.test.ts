import { App } from '@/app';
import { UserModel } from '@/models/users.models';
import { UserRoute } from '@/routes/users.route';
import { AuthRoute } from '@/routes/auth.route';
import request from 'supertest';

describe('Auth Router', () => {
  let app: App;
  let usersRoute: UserRoute;
  let authRoute: AuthRoute;
  const email = 'test@example.com';
  const password = '123456789';
  let token: string;
  let userId: string;

  beforeAll(async () => {
    usersRoute = new UserRoute();
    authRoute = new AuthRoute();
    app = new App([usersRoute, authRoute]);

    // Criar um usuário para teste
    const userData = {
      name: 'Test User',
      email,
      password,
    };

    await UserModel.deleteOne({ email });

    const response = await request(app.getServer()).post('/signup').send(userData);
    token = response.body.token;
    userId = response.body.user._id;
  });

  afterAll(async () => {
    await app.closeDatabaseConnection();
    await app.closeQueueConnections();
  });

  describe('[GET] /users', () => {
    it('response should return status 200 and an array of users', async () => {
      const response = await request(app.getServer()).get('/users');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('[GET] /users/:id', () => {
    it('response should return status 200 and the user data', async () => {
      const response = await request(app.getServer()).get(`/users/${userId}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body._id).toBe(userId);
    });
  });

  describe('[PUT] /users/:id', () => {
    it('response should return status 200 and the updated user data', async () => {
      const updatedUserData = {
        name: 'Updated Name',
      };

      const response = await request(app.getServer()).put(`/users/${userId}`).send(updatedUserData).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.user._id).toBe(userId);
      expect(response.body.user.name).toBe(updatedUserData.name);
      expect(response.body.message).toBe('User successfully updated');
    });
  });
});
