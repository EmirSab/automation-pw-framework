import { Page, expect, request } from "@playwright/test";
import fetch from 'node-fetch';
import {
    birthdate, city,
    contentType, country,
    email, emailForContact, emptyBirthday, emptyEmail, emptyPhone,
    firstNameData,
    firstNameEmpty, firstNameNineteenCharacters,
    firstNameTwentyCharacters, firstNameTwentyOneCharacters, incorrectBirthday, IncorrectPhone,
    lastNameData,
    lastNameEmpty, lastNameNineteenCharacters, lastNameTwentyCharacters, lastNameTwentyOneCharacters,
    password, phone, postalCode, stateProvince, street1, street2
} from "../data/userData";
import ENV from '../utils/env';
import {CalculateTimeDifference} from "../utils/utils";
const data = JSON.parse(JSON.stringify(require('../auth.json')));
const token = data.cookies[0].value;
export default class LoginPageApi {
    private page: Page;
    readonly firstName: string;
    readonly lastName: string;
    readonly url: string;
    readonly post: string;
    readonly get: string;
    readonly contacts: string;
    readonly server: string;
    readonly contactId: string;
    constructor(page: Page) {
        this.page = page;
        this.firstName = 'firstName';
        this.lastName = 'lastName';
        this.post = 'Created';
        this.url = ENV.API_URL!;
        this.contacts = '/contacts';
        this.server = 'Cowboy';
        this.get = 'OK';
        this.contactId = '/contacts/655b463ae85cba0013e859f8'
    }


    async verifyThePage() {
        const response =  await fetch(this.url,{
            method: "GET"
        });        
        expect(response.status).toEqual(200);
    }

    private async addNewContact(firstNameData:string, lastNameData:string) {
        var dateTime = new Date();
        const requestContext = await request.newContext();
        const responseAddContact = await requestContext.post(this.url + this.contacts, {
            data: {
                firstName: firstNameData,
                lastName: lastNameData
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const body = await responseAddContact.json();
        const status = responseAddContact.status();
        const contentType = responseAddContact.headers();
        const statusText = responseAddContact.statusText();
        const url = responseAddContact.url();
        return [status, contentType, body, dateTime,statusText,url];
    }
    private async addNewContactWithAllFields(firstNameData:string, lastNameData:string, birthdate:string, emailForContact:string,phone:string,
                                             street1: string,street2: string, city: string, stateProvince: string, postalCode:string,
                                             country: string) {
        var dateTime = new Date();
        const requestContext = await request.newContext();
        const responseAddContact = await requestContext.post(this.url + this.contacts, {
            data: {
                firstName: firstNameData,
                lastName: lastNameData,
                birthdate: birthdate,
                email: emailForContact,
                phone: phone,
                street1:street1,
                street2: street2,
                city:city,
                stateProvince: stateProvince,
                postalCode: postalCode,
                country: country
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const body = await responseAddContact.json();
        const status = responseAddContact.status();
        const contentType = responseAddContact.headers();
        const statusText = responseAddContact.statusText();
        const url = responseAddContact.url();
        return [status, contentType, body, dateTime,statusText,url];
    }
    private async addNewContactNoPhoneField(firstNameData:string, lastNameData:string, birthday:string, emailForContact:string,
                                             street1: string,street2: string, city: string, stateProvince: string, postalCode:string,
                                             country: string) {
        var dateTime = new Date();
        const requestContext = await request.newContext();
        const responseAddContact = await requestContext.post(this.url + this.contacts, {
            data: {
                firstName: firstNameData,
                lastName: lastNameData,
                birthday: birthday,
                email: emailForContact,
                street1:street1,
                street2: street2,
                city:city,
                stateProvince: stateProvince,
                postalCode: postalCode,
                country: country
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const body = await responseAddContact.json();
        const status = responseAddContact.status();
        const contentType = responseAddContact.headers();
        const statusText = responseAddContact.statusText();
        const url = responseAddContact.url();
        return [status, contentType, body, dateTime,statusText,url];
    }
    private async getAllContacts() {
        var dateTime = new Date();
        const requestContext = await request.newContext();
        const responseGetsContacts = await requestContext.get(this.url + this.contacts, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const body = await responseGetsContacts.json();
        const status = responseGetsContacts.status();
        const statusText = responseGetsContacts.statusText();
        const contentType = responseGetsContacts.headers();
        const url = responseGetsContacts.url();
        return [status, contentType, body,statusText,url,dateTime];
    }

    //Verify that the API returns an error message if the requested resource does not exist.
    //Verify that the API returns a success message if the resource is created successfully
    //Verify that the API returns a success message if the resource is updated successfully
    //Verify that the API returns a success message if the resource is deleted successfully.
    //Verify that the API returns a success message if the resource is retrieved successfully

    //#region Put
    //#endregion

    //#region Get Contact
    private async getIdsFromAllContactsForTheUser() {
        var contactId = await this.getAllContacts();
        var arrayOfContacts = contactId[2];
        let arrayOfIds = [];
        arrayOfContacts.forEach(val => {
            arrayOfIds.push(val['_id']);
        })
        return arrayOfIds;
    }
    private async getContactById() {
        var idArray = await  this.getIdsFromAllContactsForTheUser();
        var randomId = idArray[Math.floor(Math.random() * idArray.length)];
        var dateTime = new Date();
        const requestContext = await request.newContext();
        const responseGetContact = await requestContext.get(this.url + this.contacts + `/${randomId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const body = await responseGetContact.json();
        const status = responseGetContact.status();
        const statusText = responseGetContact.statusText();
        const oneRecord = Object.keys(body).length;
        const contentType = responseGetContact.headers();
        // const url = responseGetContact.url();
        return [body,status,statusText,oneRecord,contentType]
    }
    async verifyGetContactByIdReturnedOnlyOneContact() {
        const contact = await this.getContactById();
        const oneRecord = contact[3];
        expect(oneRecord).toBeLessThan(15);
    }
    async verifyThatGetContactByIdIsSuccessful() {
        //returns 200
        const status =  await this.getContactById();
        expect(status[1]).toEqual(200);
    }
    async verifyGeContactByIdSuccessfulStatusText() {
        const statusText =  await this.getContactById();
        expect(statusText[2]).toEqual('OK');
    }
    async verifyThatMoreThanOneContactsIsReturnedWhenEmptyStringIsSent() {
        const emptyId = ' ';
        const requestContext = await request.newContext();
        const responseGetContact = await requestContext.get(this.url + this.contacts + `/${emptyId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const body = await responseGetContact.json();
        expect(body.length).toBeGreaterThan(1);
    }
    async verifyErrorMessageIfWrongIdIsSent() {
        let emptyId = '/0gfdgdfgfd';
        const requestContext = await request.newContext();
        const responseGetContact = await requestContext.get(this.url + this.contacts + emptyId, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const status = responseGetContact.status();
        expect(status).toEqual(400);
    }
    async verifyThatResponseHeaderIsCorrectGetContactById() {
        const header = await this.getContactById();
        expect(header[4]['server']).toEqual(this.server);
    }
    async verifyThatResponseContainsAllFieldsGetContactById() {
        const requiredFields = await this.getContactById();
        expect(Object.keys(requiredFields[0])).toEqual(expect.arrayContaining([this.firstName,this.lastName]));
    }
    async verifyThatResponseContainsCorrectDataTypeForGetContactById() {
        const requiredFieldsTypes = await this.getContactById();
        const firstNameValue = requiredFieldsTypes[0]['firstName'];
        const lastNameValue = requiredFieldsTypes[0]['lastName'];
        expect(typeof firstNameValue).toEqual(expect.any(String));
        expect(typeof lastNameValue).toEqual(expect.any(String));
    }
    //#endregion

    //#region GET
    async verifyThatResponseTimeIsInAcceptableLimitsGetAccounts() {
        const responseTime = await this.getAllContacts();
        const seconds = CalculateTimeDifference(responseTime[5],responseTime[1]['date']);
        expect(seconds).toBeLessThan(2);
    }
    async verifyThatResponseContainsCorrectDataTypeForFieldsGetAccounts() {
        const requiredFieldsTypes = await this.getAllContacts();
        requiredFieldsTypes[2].forEach(function (val) {
            expect(typeof val['firstName']).toEqual(expect.any(String));
            expect(typeof val['lastname']).toEqual(expect.any(String));
        });
    }
    async verifyThatResponseContainsAllFieldsGetAccounts() {
        const requiredFields = await this.getAllContacts();
        Object.keys(requiredFields[2]).forEach(key => {
            expect(Object.keys(requiredFields[2][key])).toEqual(expect.arrayContaining([this.firstName,this.lastName]));
        });
    }
    async verifyApiResponseHeaderIsCorrectGetAccounts() {
        const header = await this.getAllContacts();
        expect(header[1]['server']).toEqual(this.server);
    }
    async verifyEndpointUrlIsCorrectGetAccounts() {
        const url = await this.getAllContacts();
        expect(url[4]).toContain(this.contacts);
    }
    async verifyContentTypeOfResponseGetAccounts() {
        const contentTypeFromApiGetAllContacts = await this.getAllContacts();
        const contentTypeValue = contentTypeFromApiGetAllContacts[1]['content-type'];
        expect(contentTypeValue).toEqual(contentType);
    }
    async getAllContactsAndVerifyResponseIsSuccessful() {
        const status = await this.getAllContacts();
        expect(status[0]).toBe(200);
    }
    async verifyApiMethodIsCorrectGetAllContacts() {
        const apiStatus = await this.getAllContacts();
        expect(apiStatus[3]).toEqual(this.get);
    }
    //#endregion

    async verifyErrorMessageIfRequestPayloadIsMissing() {
        const status = await this.addNewContact(firstNameEmpty, lastNameEmpty);
        expect(status[0]).toEqual(400);
    }
    async verifyApiResponseHeaderIsCorrect() {
        const header = await this.addNewContact(firstNameData,lastNameData);
        expect(header[1]['server']).toEqual(this.server);
    }
    async verifyEndpointUrlIsCorrect() {
        const url = await this.addNewContact(firstNameData,lastNameData);
        expect(url[5]).toContain(this.contacts);
    }
    async verifyThatApiMethodIsCorrect() {
        const apiStatus = await this.addNewContact(firstNameData,lastNameData);
        expect(apiStatus[4]).toEqual(this.post);
    }
    async addNewContactByApi() {
        const status = await this.addNewContact(firstNameData,lastNameData);
        expect(status[0]).toEqual(201);
    }
    async verifyContentTypeOfResponse() {
        const contentTypeFromApi = await this.addNewContact(firstNameData,lastNameData);
        const contentTypeValue = contentTypeFromApi[1]['content-type'];
        expect(contentTypeValue).toEqual(contentType);
    }
    async verifyThatResponseContainsAllRequiredFields() {
        const requiredFields = await this.addNewContact(firstNameData,lastNameData);
        expect(Object.keys(requiredFields[2])).toEqual(expect.arrayContaining([this.firstName,this.lastName]));
    }
    async verifyThatResponseContainsCorrectDataForRequiredField() {
        const requiredFieldsTypes = await this.addNewContact(firstNameData,lastNameData);
        const firstNameValue = requiredFieldsTypes[2]['firstName'];
        const lastNameValue = requiredFieldsTypes[2]['lastName'];
        expect(typeof firstNameValue).toEqual(expect.any(String));
        expect(typeof lastNameValue).toEqual(expect.any(String));
    }
    async verifyThatResponseTimeIsInAcceptableLimits() {
        const responseTime = await this.addNewContact(firstNameData,lastNameData);
        const seconds = CalculateTimeDifference(responseTime[3],responseTime[1]['date']);
        expect(seconds).toBeLessThan(2);
    }

    //#region Add Contact with all fields
    async addUserWithAllFieldsAndVerifySuccessfulStatus() {
        const apiStatus = await this.addNewContactWithAllFields(firstNameData,lastNameData,birthdate,emailForContact,
            phone,street1,street2,city,stateProvince,postalCode,country);
        expect(apiStatus[0]).toEqual(201);
    }
    async addUserWithAllFieldsAndVerifyErrorStatus() {
        //one field is not correct value
        const apiStatus = await this.addNewContactWithAllFields(firstNameData,lastNameData,birthdate,emailForContact,
            IncorrectPhone,street1,street2,city,stateProvince,postalCode,country);
        expect(apiStatus[0]).toEqual(400);
    }
    async addUserWithPhoneFieldMissingAndVerifyErrorStatus() {
        const apiStatus = await this.addNewContactWithAllFields(firstNameData,lastNameData,birthdate,emailForContact,
            emptyPhone,street1,street2,city,stateProvince,postalCode,country);
        expect(apiStatus[0]).toEqual(400);
    }
    async addUserWithBirthdayFieldEmptyAndVerifySuccessStatus() {
        const apiStatus = await this.addNewContactWithAllFields(firstNameData,lastNameData,emptyBirthday,emailForContact,
            emptyPhone,street1,street2,city,stateProvince,postalCode,country);
        expect(apiStatus[0]).toEqual(400);
    }
    async addUserWithIncorrectBirthdayFieldAndVerifySuccessStatus() {
        const apiStatus = await this.addNewContactWithAllFields(firstNameData,lastNameData,incorrectBirthday,emailForContact,
            emptyPhone,street1,street2,city,stateProvince,postalCode,country);
        expect(apiStatus[0]).toEqual(400);
    }
    async addUserWithEmailFieldEmptyAndVerifySuccessStatus() {
        const apiStatus = await this.addNewContactWithAllFields(firstNameData,lastNameData,birthdate,emptyEmail,
            emptyPhone,street1,street2,city,stateProvince,postalCode,country);
        expect(apiStatus[0]).toEqual(400);
    }
    async addUserWithStreet1FieldMissingAndVerifyErrorStatus() {}
    async verifyCorrectDateFormatForBirthdayField() {}
    async verifyCorrectEmailFormatForEmailField() {}
    async verifyCorrectPhoneFormatForPhoneField() {}

    //#endregion
    async verifyMaximumCharLengthForFirsNameField() {
        //20 chars
        const status = await this.addNewContact(firstNameTwentyCharacters,lastNameData);
        expect(status[0]).toEqual(201);
    }
    async verifyMaximumCharLengthForFirsNameFieldPlusOneChar() {
        //21 chars
        const status = await this.addNewContact(firstNameTwentyOneCharacters,lastNameData);
        expect(status[0]).toEqual(400);
    }
    async verifyMaximumCharLengthForFirsNameFieldMinusOneChar() {
        //19 chars
        const status = await this.addNewContact(firstNameNineteenCharacters,lastNameData);
        expect(status[0]).toEqual(201);
    }
    async verifyMaximumCharLengthForLastNameField() {
        //20 chars
        const status = await this.addNewContact(firstNameData,lastNameTwentyCharacters);
        expect(status[0]).toEqual(201);
    }
    async verifyMaximumCharLengthForLastNameFieldPlusOneChar() {
        //21 chars
        const status = await this.addNewContact(firstNameData,lastNameTwentyOneCharacters);
        expect(status[0]).toEqual(400);
    }
    async verifyMaximumCharLengthForLastNameFieldMinusOneChar() {
        //19 chars
        const status = await this.addNewContact(firstNameData,lastNameNineteenCharacters);
        expect(status[0]).toEqual(201);
    }
}