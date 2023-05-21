import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { InversorsRoute } from './routes/inversors.route';
import { PowerGeneratedRoute } from './routes/powerGenerated.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new InversorsRoute(), new PowerGeneratedRoute()]);

app.listen();
