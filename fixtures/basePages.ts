import LoginPageApi from '../pages/LoginPageApi';
import {Browser, test as baseTest} from '@playwright/test'

const test = baseTest.extend<{
    loginPageApi: LoginPageApi;
    browser: Browser;
}>({
    loginPageApi: async({page}, use) => {
        await use(new LoginPageApi(page));
    }
});
export default test;
export const expect = test.expect;