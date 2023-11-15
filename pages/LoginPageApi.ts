import { Page } from "@playwright/test";
import ENV from '../utils/env';

export default class LoginPageApi {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async goToPage() {
        await this.page.goto(ENV.API_URL!);
    }
}