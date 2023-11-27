import { FullConfig } from "@playwright/test";
import dotenv from 'dotenv';
import { getLoginToken } from "../api-calls/getLoginToken";
import { email, password } from "../data/userData";
async function globalSetup(config:FullConfig) {
    if(process.env.test_env) {
        dotenv.config({
            path: `.env.${process.env.test_env}`,
            override: true
        });
    }

    await getLoginToken(email,password);
}
export default globalSetup;