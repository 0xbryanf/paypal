import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import StandardController from '@/resources/standard/standard.controller';

validateEnv();
const app = new App(
    [new StandardController()],
    Number(process.env.port)
)
app.listen();