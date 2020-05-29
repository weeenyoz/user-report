import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './user.model';
import { LoginResponse, SignUpResponse } from './auth.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private token = '';
    private isLoggedInStatusListener = new Subject<boolean>();
    private isSignedUpStatusListener = new Subject<SignUpResponse>();

    constructor(private httpClient: HttpClient) {}

    getToken() {
        return this.token;
    }

    getIsLoggedInStatusListener() {
        return this.isLoggedInStatusListener.asObservable();
    }

    getIsSignedUpStatusListener() {
        return this.isSignedUpStatusListener.asObservable();
    }

    signUp(authData: AuthData) {
        this.httpClient
            .post<{ message: string }>('api/user/signup', { ...authData })
            .subscribe(
                (res) => {
                    console.log('res: ', res);
                    this.isSignedUpStatusListener.next({
                        isSignedUp: true,
                        message: res.message,
                    });
                },
                (error) => {
                    console.log(error.error.message);
                    this.isSignedUpStatusListener.next({
                        isSignedUp: false,
                        message: error.error.message,
                    });
                },
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
                (error) => {
                    console.log(error);
                },
            );
    }
}
