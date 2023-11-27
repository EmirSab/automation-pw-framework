import { Page, expect, request } from "@playwright/test";
import fetch from 'node-fetch';
import { getLoginToken } from "../api-calls/getLoginToken";
import { email, password } from "../data/userData";

export default class LoginPageApi {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async verifyThePage() {
        const response =  await fetch("https://thinking-tester-contact-list.herokuapp.com/",{
            method: "GET"
        });        
        expect(response.status).toEqual(200);
    }

    async addNewContactByApi() {
        await this.page.goto('https://thinking-tester-contact-list.herokuapp.com/contactList');
        await this.page.pause();
    }
}