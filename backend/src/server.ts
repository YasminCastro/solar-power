import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { InvertersRoute } from './routes/inverters.route';
import { PowerGeneratedRoute } from './routes/powerGenerated.route';
import { UtilsRoute } from './routes/utils.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new InvertersRoute(), new PowerGeneratedRoute(), new UtilsRoute()]);

app.listen();
