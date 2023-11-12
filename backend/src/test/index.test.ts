import { App } from '@/app';
import { AuthRoute } from '@/routes/auth.route';
import request from 'supertest';

describe('App online', () => {
  let app: App;

  beforeAll(() => {
    // Inicializar o app e as rotas
    app = new App([new AuthRoute()]);
  });

  afterAll(async () => {
    // Fechar conexões do banco de dados e das filas
    await app.closeDatabaseConnection();
    await app.closeQueueConnections();
  });

  describe('[GET] /', () => {
    it('response statusCode 201', async () => {
      await request(app.getServer()).get('/').expect(201);
    });
  });
});
