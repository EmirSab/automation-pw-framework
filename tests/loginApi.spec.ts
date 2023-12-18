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
    test('Verify that response is in the right format API-003', async ({ loginPageApi }) => {
        await loginPageApi.verifyContentTypeOfResponse();
    });
    test('Verify that response contains all required fields API-004', async ({ loginPageApi }) => {
        await loginPageApi.verifyThatResponseContainsAllRequiredFields();
    });
    test('Verify that values of the fields are correct type, API-005', async ({ loginPageApi }) => {
        await loginPageApi.verifyThatResponseContainsCorrectDataForRequiredField();
    });
    test('Verify that response time is in acceptable limits, API-006', async ({ loginPageApi }) => {
        await loginPageApi.verifyThatResponseTimeIsInAcceptableLimits();
    });
    test('Verify that API method is correct, API-007', async ({ loginPageApi }) => {
        await loginPageApi.verifyThatApiMethodIsCorrect();
    });
    test('Verify that the API endpoint URL is correct, API-008', async ({ loginPageApi }) => {
        await loginPageApi.verifyEndpointUrlIsCorrect();
    });
    test('Verify that the API response headers are correct, API-009', async ({ loginPageApi }) => {
        await loginPageApi.verifyApiResponseHeaderIsCorrect();
    });
    test('Verify that the API returns an error message if the request payload is missing, API-010', async ({ loginPageApi }) =>{
        await loginPageApi.verifyErrorMessageIfRequestPayloadIsMissing();
    });
    test('Get all contacts and verify the status, API-011', async ({ loginPageApi }) =>{
        await loginPageApi.getAllContactsAndVerifyResponseIsSuccessful();
    });
    test('Verify that API GET method is correct, API-012', async ({ loginPageApi }) =>{
        await loginPageApi.verifyApiMethodIsCorrectGetAllContacts();
    });
    test('Verify that the API response headers are correct in GET all accounts request, API-013', async ({ loginPageApi }) =>{
        await loginPageApi.verifyApiResponseHeaderIsCorrectGetAccounts();
    });
    test('Verify that the API endpoint URL is correct for GET all contacts, API-014', async ({ loginPageApi }) =>{
        await loginPageApi.verifyEndpointUrlIsCorrectGetAccounts();
    });
    test('Verify the content of the response is correct GET all contacts, API-015', async ({ loginPageApi }) =>{
        await loginPageApi.verifyContentTypeOfResponseGetAccounts();
    });
    test('Verify that response time is in acceptable limits GET all contacts, API-016', async ({ loginPageApi }) =>{
        await loginPageApi.verifyThatResponseTimeIsInAcceptableLimitsGetAccounts();
    });
    test('Verify that response contains all required fields, GET all contacts, API-017', async ({ loginPageApi }) =>{
        await loginPageApi.verifyThatResponseContainsAllFieldsGetAccounts();
    });
    test('Verify that response contains correct data type for the required fields, GET all contacts, API-018', async ({ loginPageApi }) =>{
        await loginPageApi.verifyThatResponseContainsCorrectDataTypeForFieldsGetAccounts();
    });
    test('Verify that api call returns single contact by Id, API-019', async ({ loginPageApi }) =>{
        await loginPageApi.verifyGetContactByIdReturnedOnlyOneContact();
    });
    test('Verify that api call get contact by Id is successful, API-020', async ({ loginPageApi }) =>{
        await loginPageApi.verifyThatGetContactByIdIsSuccessful();
    });
    test('Verify that api call get contact by Id status is successful, API-021', async ({ loginPageApi }) =>{
        await loginPageApi.verifyThatGetContactByIdIsSuccessful();
    });
    test('Verify that api call get contact by Id status text is successful, API-022', async ({ loginPageApi }) =>{
        await loginPageApi.verifyGeContactByIdSuccessfulStatusText();
    });
    test('Verify that more than one contact is returned when empty Id is sent, API-023', async ({ loginPageApi }) =>{
        await loginPageApi.verifyThatMoreThanOneContactsIsReturnedWhenEmptyStringIsSent();
    });
    test('Verify the error message if wrong Id is sent, API-024', async ({ loginPageApi }) =>{
        await loginPageApi.verifyErrorMessageIfWrongIdIsSent();
    });
    test('Verify that response header is correct Get Contact by Id, API-025', async ({ loginPageApi }) =>{
        await loginPageApi.verifyThatResponseHeaderIsCorrectGetContactById();
    });
    test('Verify that response Get Contact by Id contains all required fields, API-026', async ({ loginPageApi }) =>{
        await loginPageApi.verifyThatResponseContainsAllFieldsGetContactById();
    });
    test('Verify that response Get Contact by Id contains correct data type, API-027', async ({ loginPageApi }) =>{
        await loginPageApi.verifyThatResponseContainsCorrectDataTypeForGetContactById();
    });
})