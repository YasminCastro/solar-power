import { App } from '@/app';
import { UserModel } from '@/models/users.models';
import { InverterModel } from '@/models/inverters.models';
import { AuthRoute } from '@/routes/auth.route';
import { InvertersRoute } from '@/routes/inverters.route';
import request from 'supertest';

describe('Inverters Router', () => {
  let app: App;
  let authRoute: AuthRoute;
  let invertersRoute: InvertersRoute;
  const email = 'test@example.com';
  const password = '123456789';
  const inverterNameElgin = `Elgin Test Jest`;
  const inverterHauweiElgin = `Hauwei Test Jest`;
  let token: string;
  let userId: string;
  let inverterElginId: string;
  let inverterHauweiId: string;

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
    await InverterModel.deleteOne({ name: inverterNameElgin });
    await InverterModel.deleteOne({ name: inverterHauweiElgin });

    const response = await request(app.getServer()).post('/signup').send(userData);
    token = response.body.token;
    userId = response.body.user._id;
  });

  afterAll(async () => {
    await UserModel.deleteOne({ email });
    await app.closeDatabaseConnection();
    await app.closeQueueConnections();
  });

  describe('[POST] /inverters', () => {
    it('should create an ELGIN inverter and return the inverter data', async () => {
      const inverterData = {
        name: inverterNameElgin,
        model: 'elgin',
        username: 'Teste',
        password: 'teste123',
        cep: '74000000',
        maxRealTimePower: 3,
      };

      const response = await request(app.getServer()).post('/inverters').send(inverterData).set('Authorization', `Bearer ${token}`);

      inverterElginId = response.body.inverter._id;

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Inverter successfully created');
      expect(response.body.inverter).toBeDefined();
      expect(response.body.inverter.model).toBe('elgin');
      expect(response.body.inverter.name).toBe(inverterData.name);
    });
  });

  describe('[POST] /inverters', () => {
    it('should create an HAUWEI inverter and return the inverter data', async () => {
      const inverterData = {
        name: inverterHauweiElgin,
        model: 'hauwei',
        username: 'Teste',
        password: 'teste123',
        cep: '74000000',
        maxRealTimePower: 3,
      };

      const response = await request(app.getServer()).post('/inverters').send(inverterData).set('Authorization', `Bearer ${token}`);

      inverterHauweiId = response.body.inverter._id;

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Inverter successfully created');
      expect(response.body.inverter).toBeDefined();
      expect(response.body.inverter.model).toBe('hauwei');
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

  describe('[GET] /inverters/inverter/:id', () => {
    it('response should return status 200 and the inverter data', async () => {
      const response = await request(app.getServer()).get(`/inverters/inverter/${inverterElginId}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body._id).toBe(inverterElginId);
    });
  });

  describe('[GET] /inverters/user/:id', () => {
    it('response should return status 200 and all user inverter', async () => {
      const response = await request(app.getServer()).get(`/inverters/user/${userId}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('[PUT] /inverters/:id', () => {
    it('response should return status 200 and the updated user data', async () => {
      const updatedInverterData = {
        name: 'Updated Name',
      };

      const response = await request(app.getServer())
        .put(`/inverters/${inverterElginId}`)
        .send(updatedInverterData)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.inverter._id).toBe(inverterElginId);
      expect(response.body.inverter.name).toBe(updatedInverterData.name);
      expect(response.body.message).toBe('Inverter successfully updated');
    });
  });

  describe('[DELETE] /inverters/:id', () => {
    it('response should return status 200 and the success message', async () => {
      const responseElgin = await request(app.getServer()).delete(`/inverters/${inverterElginId}`).set('Authorization', `Bearer ${token}`);

      expect(responseElgin.status).toBe(200);
      expect(responseElgin.body).toBeDefined();
      expect(responseElgin.body.message).toBe('Inverter successfully deleted');

      const responseHauwei = await request(app.getServer()).delete(`/inverters/${inverterHauweiId}`).set('Authorization', `Bearer ${token}`);

      expect(responseHauwei.status).toBe(200);
      expect(responseHauwei.body).toBeDefined();
      expect(responseHauwei.body.message).toBe('Inverter successfully deleted');
    });
  });
});
