import { App } from '@/app';
import { UserModel } from '@/models/users.models';
import { InverterModel } from '@/models/inverters.models';
import { AuthRoute } from '@/routes/auth.route';
import { InvertersRoute } from '@/routes/inverters.route';
import request from 'supertest';
import moment from 'moment';

describe('Inverters Router', () => {
  let app: App;
  let authRoute: AuthRoute;
  let invertersRoute: InvertersRoute;
  const email = 'test@example.com';
  const password = '123456789';
  const inverterName = `Teste Jest`;
  let token: string;

  beforeAll(async () => {
    invertersRoute = new InvertersRoute();
    authRoute = new AuthRoute();
    app = new App([invertersRoute, authRoute]);

    // Criar um usuário para teste
    const userData = {
      name: 'Test User',
      email,
      password,
    };

    await UserModel.deleteOne({ email });
    await InverterModel.deleteOne({ name: inverterName });

    const response = await request(app.getServer()).post('/signup').send(userData);
    token = response.body.token;
  });

  afterAll(async () => {
    await app.closeDatabaseConnection();
    await app.closeQueueConnections();
  });

  describe('[POST] /inverters', () => {
    it('should create an ELGIN inverter and return the inverter data', async () => {
      const inverterData = {
        name: inverterName,
        model: 'elgin',
        username: 'Teste',
        password: 'teste123',
        cep: '74000000',
        maxRealTimePower: 3,
      };

      const response = await request(app.getServer()).post('/inverters').send(inverterData).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Inverter successfully created');
      expect(response.body.inverter).toBeDefined();
      expect(response.body.inverter.model).toBe('elgin');
      expect(response.body.inverter.name).toBe(inverterData.name);
    });
  });

  // describe('[GET] /users/:id', () => {
  //   it('response should return status 200 and the user data', async () => {
  //     const response = await request(app.getServer()).get(`/users/${userId}`).set('Authorization', `Bearer ${token}`);

  //     expect(response.status).toBe(200);
  //     expect(response.body).toBeDefined();
  //     expect(response.body._id).toBe(userId);
  //   });
  // });

  // describe('[PUT] /users/:id', () => {
  //   it('response should return status 200 and the updated user data', async () => {
  //     const updatedUserData = {
  //       name: 'Updated Name',
  //     };

  //     const response = await request(app.getServer()).put(`/users/${userId}`).send(updatedUserData).set('Authorization', `Bearer ${token}`);

  //     expect(response.status).toBe(200);
  //     expect(response.body).toBeDefined();
  //     expect(response.body.user._id).toBe(userId);
  //     expect(response.body.user.name).toBe(updatedUserData.name);
  //     expect(response.body.message).toBe('User successfully updated');
  //   });
  // });

  // describe('[DELETE] /users/:id', () => {
  //   it('response should return status 200 and the success message', async () => {
  //     const response = await request(app.getServer()).delete(`/users/${userId}`).set('Authorization', `Bearer ${token}`);

  //     expect(response.status).toBe(200);
  //     expect(response.body).toBeDefined();
  //     expect(response.body.message).toBe('User successfully deleted');
  //   });
  // });
});
