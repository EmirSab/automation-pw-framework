import test from "../fixtures/basePages";
import LoginPageApi from "../pages/LoginPageApi";
test.describe('Open the web page', () => {
    test('Open api page', async({loginPageApi}) => {
        await loginPageApi.goToPage();
    })
});