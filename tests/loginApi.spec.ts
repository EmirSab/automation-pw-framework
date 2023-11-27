import test from "../fixtures/basePages";
test.describe('Verify that API calles', () => {
    test('Verify that URL gives 200 status code API-001', async({loginPageApi}) => {
        await loginPageApi.verifyThePage();
    })
});

test.describe('Api calls that are using session storage',() => {
    test('Add new contact using API, API-002', async ({ loginPageApi }) => {
        await loginPageApi.addNewContactByApi();
    });
    
})