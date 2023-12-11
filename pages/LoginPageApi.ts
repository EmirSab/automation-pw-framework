import { Page, expect, request } from "@playwright/test";
import fetch from 'node-fetch';
import {contentType, email, firstNameData, firstNameEmpty, lastNameData, lastNameEmpty, password} from "../data/userData";
import { getLoginToken } from "../api-calls/getLoginToken";
import { stat } from "fs";
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
    constructor(page: Page) {
        this.page = page;
        this.firstName = 'firstName';
        this.lastName = 'lastName';
        this.post = 'Created';
        this.url = ENV.API_URL!;
        this.contacts = '/contacts';
        this.server = 'Cowboy';
        this.get = 'OK';
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

    private async getAllContacts() {
        var dateTime = new Date();
        const requestContext = await request.newContext();
        const responseAddContact = await requestContext.get(this.url + this.contacts, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const body = await responseAddContact.json();
        const status = responseAddContact.status();
        const statusText = responseAddContact.statusText();
        const contentType = responseAddContact.headers();
        const url = responseAddContact.url();
        return [status, contentType, body,statusText,url,dateTime];
    }

    //Verify that the API returns an error message if the requested resource does not exist.
    //Verify that the API returns a success message if the resource is created successfully
    //Verify that the API returns a success message if the resource is updated successfully
    //Verify that the API returns a success message if the resource is deleted successfully.
    //Verify that the API returns a success message if the resource is retrieved successfully

    //#region Get Contact

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
}