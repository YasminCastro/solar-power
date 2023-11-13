import { App } from '@/app';
import { UserModel } from '@/models/users.models';
import { AchivementsModel } from '@/models/achievements.models';
import { AuthRoute } from '@/routes/auth.route';
import { InvertersRoute } from '@/routes/inverters.route';
import { AchivementsRoute } from '@/routes/achievements.route';
import request from 'supertest';

describe('achievements Router', () => {
  let app: App;
  let authRoute: AuthRoute;
  let invertersRoute: InvertersRoute;
  let achivementsRoute: AchivementsRoute;
  const email = 'test@example.com';
  const password = '123456789';
  const inverterNameElgin = `Elgin Test Jest`;
  const inverterHauweiElgin = `Hauwei Test Jest`;
  const achivementName = 'Test Jest';

  let token: string;
  let userId: string;
  let AchievementId: string;
  let inverterHauweiId: string;
  let achivementId: string;

  beforeAll(async () => {
    invertersRoute = new InvertersRoute();
    achivementsRoute = new AchivementsRoute();
    authRoute = new AuthRoute();
    app = new App([invertersRoute, authRoute, achivementsRoute]);

    // Criar um usuário para teste
    const userData = {
      name: 'Test User',
      email,
      password,
    };

    await UserModel.deleteOne({ email });
    await AchivementsModel.deleteOne({ name: achivementName });

    const response = await request(app.getServer()).post('/signup').send(userData);
    token = response.body.token;
    userId = response.body.user._id;
  });

  afterAll(async () => {
    await UserModel.deleteOne({ email });
    await AchivementsModel.deleteOne({ name: achivementName });

    await app.closeDatabaseConnection();
    await app.closeQueueConnections();
  });

  describe('[POST] /achievements', () => {
    it('should create an achievement and return the achivement data', async () => {
      const achivementData = {
        name: achivementName,
        description: 'Teste',
        points: 50,
      };

      const response = await request(app.getServer()).post('/achievements').send(achivementData).set('Authorization', `Bearer ${token}`);

      achivementId = response.body._id;

      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.name).toBe(achivementData.name);
    });
  });

  describe('[GET] /achievements', () => {
    it('response should return status 200 and an array of achievements', async () => {
      const response = await request(app.getServer()).get('/achievements').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
    });
  });

  describe('[GET] /achievements/:id', () => {
    it('response should return status 200 and the achievement data', async () => {
      const response = await request(app.getServer()).get(`/achievements/${achivementId}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body._id).toBe(achivementId);
    });
  });

  describe('[PUT] /achievements/:id', () => {
    it('response should return status 200 and the updated achievements data', async () => {
      const updatedAchievementsData = {
        name: 'Updated Name',
      };

      const response = await request(app.getServer())
        .put(`/achievements/${AchievementId}`)
        .send(updatedAchievementsData)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.achievement._id).toBe(AchievementId);
      expect(response.body.achievement.name).toBe(updatedAchievementsData.name);
      expect(response.body.message).toBe('Achievement successfully updated');
    });
  });

  // describe('[DELETE] /inverters/:id', () => {
  //   it('response should return status 200 and the success message', async () => {
  //     const responseElgin = await request(app.getServer()).delete(`/inverters/${inverterElginId}`).set('Authorization', `Bearer ${token}`);

  //     expect(responseElgin.status).toBe(200);
  //     expect(responseElgin.body).toBeDefined();
  //     expect(responseElgin.body.message).toBe('Inverter successfully deleted');

  //     const responseHauwei = await request(app.getServer()).delete(`/inverters/${inverterHauweiId}`).set('Authorization', `Bearer ${token}`);

  //     expect(responseHauwei.status).toBe(200);
  //     expect(responseHauwei.body).toBeDefined();
  //     expect(responseHauwei.body.message).toBe('Inverter successfully deleted');
  //   });
  // });
});
