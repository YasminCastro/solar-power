import { App } from '@/app';
import { UserModel } from '@/models/users.models';
import { AuthRoute } from '@/routes/auth.route';
import { InvertersRoute } from '@/routes/inverters.route';
import { PowerGeneratedRoute } from '@/routes/powerGenerated.route';
import request from 'supertest';

describe('Power Generated Router', () => {
  let app: App;
  let authRoute: AuthRoute;
  let invertersRoute: InvertersRoute;
  let powerGenerated: PowerGeneratedRoute;
  const email = 'test@example.com';
  const password = '123456789';
  let token: string;
  let userId: string;
  let inverterId: string;

  beforeAll(async () => {
    invertersRoute = new InvertersRoute();
    authRoute = new AuthRoute();
    powerGenerated = new PowerGeneratedRoute();
    app = new App([invertersRoute, authRoute, powerGenerated]);

    // Criar um usuário para teste
    const userData = {
      name: 'Test User',
      email,
      password,
    };

    await UserModel.deleteOne({ email });

    const signupResponse = await request(app.getServer()).post('/signup').send(userData);
    token = signupResponse.body.token;
    userId = signupResponse.body.user._id;

    //Pegar um inversor para ver os dados
    const inverterReponse = await request(app.getServer()).get('/inverters').set('Authorization', `Bearer ${token}`);
    const inverter = inverterReponse.body.find(inverter => inverter.username === 'Glaucia ravilla');

    inverterId = inverter._id;
  });

  afterAll(async () => {
    await UserModel.deleteOne({ email });

    await app.closeDatabaseConnection();
    await app.closeQueueConnections();
  });

  describe('[GET] /power-generated/real-time/:inverterId', () => {
    it('response should return status 200 and the power genereted in real time', async () => {
      const response = await request(app.getServer()).get(`/power-generated/real-time/${inverterId}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.inverterId).toBe(inverterId);
    });
  });

  describe('[GET] /power-generated/day/:inverterId', () => {
    it('response should return status 200 and the power genereted day', async () => {
      const response = await request(app.getServer()).get(`/power-generated/day/${inverterId}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('[GET] /power-generated/month/:inverterId', () => {
    it('response should return status 200 and the power genereted month', async () => {
      const response = await request(app.getServer()).get(`/power-generated/month/${inverterId}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('[GET] /power-generated/year/:inverterId', () => {
    it('response should return status 200 and the power genereted year', async () => {
      const response = await request(app.getServer()).get(`/power-generated/year/${inverterId}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });
});
