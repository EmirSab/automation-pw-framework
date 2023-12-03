import { Page, expect, request } from "@playwright/test";
import fetch from 'node-fetch';
import { contentType, email, password } from "../data/userData";
import { getLoginToken } from "../api-calls/getLoginToken";
import { stat } from "fs";
const data = JSON.parse(JSON.stringify(require('../auth.json')));
const token = data.cookies[0].value;
export default class LoginPageApi {
    private page: Page;
    readonly firstName: string;
    readonly lastName: string;
    readonly typeOfTheRequiredFields: string;
    readonly url: string;
    readonly post: string;
    readonly contacts: string;
    readonly server: string;
    constructor(page: Page) {
        this.page = page;
        this.firstName = 'firstName';
        this.lastName = 'lastName';
        this.typeOfTheRequiredFields = 'string';
        this.post = 'Created';
        this.url = 'https://thinking-tester-contact-list.herokuapp.com';
        this.contacts = '/contacts';
        this.server = 'Cowboy';
    }


    async verifyThePage() {
        const response =  await fetch("https://thinking-tester-contact-list.herokuapp.com/",{
            method: "GET"
        });        
        expect(response.status).toEqual(200);
    }

    private async addNewContact() {
        var dateTime = new Date();
        const requestContext = await request.newContext();
        const responseAddContact = await requestContext.post(this.url + this.contacts, {
            data: {
                firstName: "BlaBla",
                lastName: "BlaBlaLast"
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

    //Verify that the API returns an error message if the request payload is missing.
    //Verify that the API returns an error message if the requested resource does not exist.
    //Verify that the API returns a success message if the resource is created successfully
    //Verify that the API returns a success message if the resource is updated successfully
    //Verify that the API returns a success message if the resource is deleted successfully.
    //Verify that the API returns a success message if the resource is retrieved successfully
    async verifyApiResponseHeaderIsCorrect() {
        const header = await this.addNewContact();
        expect(header[1]['server']).toEqual(this.server);
    }
    async verifyEndpointUrlIsCorrect() {
        const url = await this.addNewContact();
        expect(url[5]).toContain(this.contacts);
    }
    async verifyThatApiMethodIsCorrect() {
        const apiStatus = await this.addNewContact();
        expect(apiStatus[4]).toEqual(this.post);
    }
    async addNewContactByApi() {
        const status = await this.addNewContact();
        expect(status[0]).toEqual(201);
        // var d = new Date()
        //  console.log(d)
        // const requestContext = await request.newContext();
        // const reponseAddContact = await requestContext.post('https://thinking-tester-contact-list.herokuapp.com/contacts', {
        //     data: {
        //         "firstName": "BlaBla",
        //         "lastName": "BlaBlaLast"
        //     },
        //     headers: {
        //         "Authorization": `Bearer ${token}`
        //     }
        // });
        // const body = await reponseAddContact.json();
        // const headerType = reponseAddContact.headers();
        // console.log(reponseAddContact);
        // console.log(body);
    }
    async verifyContentTypeOfResponse() {
        const contentTypeFromApi = await this.addNewContact();
        const contentTypeValue = contentTypeFromApi[1]['content-type'];
        expect(contentTypeValue).toEqual(contentType);
    }
    async verifyThatReponseContainsAllRequiredFields() {
        const requiredFields = await this.addNewContact();
        expect(Object.keys(requiredFields[2])).toEqual(expect.arrayContaining([this.firstName,this.lastName]));
    }
    async verifyThatReponseContainsCorrectDataForRequiredField() {
        const requiredFieldsTypes = await this.addNewContact();
        const firstNameValue = requiredFieldsTypes[2]['firstName'];
        const lastNameValue = requiredFieldsTypes[2]['lastName'];
        expect(typeof firstNameValue).toEqual(this.typeOfTheRequiredFields);
        expect(typeof lastNameValue).toEqual(this.typeOfTheRequiredFields);
    }
    async verifyThatReponseTimeIsInAcceptableLimits() {
        const responseTime = await this.addNewContact();
        const startExecutionDateTime = responseTime[3];
        const endExecutionDateTime = new Date(responseTime[1]['date']);
        const endExecutionDateTimeToDate = new Date(endExecutionDateTime);
        const startTime = startExecutionDateTime.getTime();
        const endTime = endExecutionDateTimeToDate.getTime();
        const diff = startTime - endTime;
        const seconds = Math.floor(diff / 1000);
        expect(seconds).toBeLessThan(2);
    }
}