import test from "../fixtures/basePages";
test.describe('Verify that API calles', () => {
    test('Verify that URL gives 200 status code API-001', async({loginPageApi}) => {
        await loginPageApi.verifyThePage();
    })
});

test.describe('Api calls that are using session storage',() => {
    test('Add new contact using required fields by API and confirm stats code equals 201, API-002', async ({ loginPageApi }) => {
        await loginPageApi.addNewContactByApi();
    });
    test('Verify that reponse is in the right format API-003', async ({ loginPageApi }) => {
        await loginPageApi.verifyContentTypeOfResponse();
    });
    test('Verify that response constains all required fields API-004', async ({ loginPageApi }) => {
        await loginPageApi.verifyThatReponseContainsAllRequiredFields();
    });
    test('Verify that values of the fields are correct type, API-005', async ({ loginPageApi }) => {
        await loginPageApi.verifyThatReponseContainsCorrectDataForRequiredField();
    });
    test('Verify that response time is in acceptable limits, API-006', async ({ loginPageApi }) => {
        await loginPageApi.verifyThatReponseTimeIsInAcceptableLimits();
    });
    
})