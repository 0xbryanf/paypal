import { cleanEnv, str, port, num } from 'envalid';

function validateEnv(): void {
    cleanEnv(process.env, {
        NODE_ENV: str({
            choices: ['development', 'production']
        }),
        PORT: port({ default: 3000 }),
        PAYPAL_CLIENT_SECRET: str(),
        PAYPAL_CLIENT_ID: str(),
        BASE: str(),
    })
}

export default validateEnv;