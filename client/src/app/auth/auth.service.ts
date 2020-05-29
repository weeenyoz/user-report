import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './user.model';
import { LoginResponse } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private token = '';

    constructor(private httpClient: HttpClient) {}

    getToken() {
        return this.token;
    }

    signUp(authData: AuthData) {
        this.httpClient.post('api/user/signup', { ...authData }).subscribe(
            (res) => console.log(res),
            (error) => console.log(error),
        );
    }

    login(authData: AuthData) {
        this.httpClient
            .post<LoginResponse>('api/user/login', { ...authData })
            .subscribe(
                (res) => {
                    this.token = res.token;
                },
                (error) => console.log(error),
            );
    }
}
