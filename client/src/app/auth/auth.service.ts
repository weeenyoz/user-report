import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './user.model';
import { LoginResponse } from './auth.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private token = '';
    private isLoggedInStatusListener = new Subject<boolean>();

    constructor(private httpClient: HttpClient) {}

    getToken() {
        return this.token;
    }

    getIsLoggedInStatusListener() {
        return this.isLoggedInStatusListener.asObservable();
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
                    this.isLoggedInStatusListener.next(true);
                },
                (error) => console.log(error),
            );
    }
}
