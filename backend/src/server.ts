import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { InvertersRoute } from './routes/inverters.route';
import { PowerGeneratedRoute } from './routes/powerGenerated.route';
import { UtilsRoute } from './routes/utils.route';
import { SolarDataRoute } from './routes/solarData';
import { AchivementsRoute } from './routes/achivements.route';

ValidateEnv();

const app = new App([
  new UserRoute(),
  new AuthRoute(),
  new InvertersRoute(),
  new PowerGeneratedRoute(),
  new UtilsRoute(),
  new SolarDataRoute(),
  new AchivementsRoute(),
]);

app.listen();
