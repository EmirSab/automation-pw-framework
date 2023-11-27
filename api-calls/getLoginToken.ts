import { request } from "@playwright/test";

export async function getLoginToken(email,password) {

    const authFile = 'auth.json';
    const requestContext = await request.newContext();
    const reponse = await requestContext.post('https://thinking-tester-contact-list.herokuapp.com/users/login', {
        data: {
            "email": email,
            "password": password
        }
    });
    const body = await reponse.json();
    await requestContext.storageState({path: authFile});
}