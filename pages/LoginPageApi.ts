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
    constructor(page: Page) {
        this.page = page;
        this.firstName = 'firstName';
        this.lastName = 'lastName';
        this.typeOfTheRequiredFields = 'string';
    }


    async verifyThePage() {
        const response =  await fetch("https://thinking-tester-contact-list.herokuapp.com/",{
            method: "GET"
        });        
        expect(response.status).toEqual(200);
    }

    //5. Verify that response time is in acceptable limits, https://playwright.dev/docs/api/class-request#request-timing
    //Add contact by using API with only required fields and verify the status response is 200

    private async addNewContact() {
        var dateTime = new Date();
        const requestContext = await request.newContext();
        const reponseAddContact = await requestContext.post('https://thinking-tester-contact-list.herokuapp.com/contacts', {
            data: {
                firstName: "BlaBla",
                lastName: "BlaBlaLast"
            },
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        const body = await reponseAddContact.json();
        const status = reponseAddContact.status();
        const contentType = reponseAddContact.headers();
        return [status, contentType, body, dateTime];
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
        // console.log(reponseAddContact);
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