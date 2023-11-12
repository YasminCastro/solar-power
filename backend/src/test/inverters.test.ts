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

  describe('[GET] /inverters', () => {
    it('response should return status 200 and an array of inverters', async () => {
      const response = await request(app.getServer()).get('/inverters').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });
});
