import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { InversorRoute } from './routes/inversor.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new InversorRoute()]);

app.listen();
