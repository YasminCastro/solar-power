import { App } from '@/app';
import { UserModel } from '@/models/users.models';
import { AuthRoute } from '@/routes/auth.route';
import request from 'supertest';

describe('Auth Router', () => {
  let app: App;
  let authRoute: AuthRoute;
  const email = 'test@example.com';
  const password = '123456789';

  beforeAll(() => {
    // Inicializar o app e as rotas
    authRoute = new AuthRoute();
    app = new App([authRoute]);
  });

  afterAll(async () => {
    // Excluir o usuário criado durante o teste
    await UserModel.deleteOne({ email });

    // Fechar conexões do banco de dados e das filas
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
      // Verificar se o token e os dados do usuário estão presentes na resposta
      expect(response.body.token).toBeDefined();
      expect(response.body.user).toBeDefined();
      expect(response.body.user.email).toBe(userData.email);
      expect(response.body.user.name).toBe(userData.name);
    });
  });

  describe('[POST] /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      // Substitua com credenciais de teste válidas
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
