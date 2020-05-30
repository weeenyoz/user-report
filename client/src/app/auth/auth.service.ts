import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthData } from './user.model';
import { AuthResponse, LoginResponse, SignUpResponse } from './auth.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private isAuthenticated = false;
    private token = '';
    private tokenTimer: any;
    private isLoggedInStatusListener = new Subject<LoginResponse>();
    private isSignedUpStatusListener = new Subject<SignUpResponse>();

    constructor(private httpClient: HttpClient, public router: Router) {}

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getIsLoggedInStatusListener() {
        return this.isLoggedInStatusListener.asObservable();
    }

    getIsSignedUpStatusListener() {
        return this.isSignedUpStatusListener.asObservable();
    }

    autoAuthUser() {
        const authInfo = this.getAuthData();

        if (!authInfo) {
            return;
        }

        const now = new Date();
        const expiresIn = authInfo.expiration.getTime() - now.getTime();

        const isNotExpired = expiresIn > 0 ? true : false;

        if (isNotExpired) {
            this.token = authInfo.token;
            this.isAuthenticated = true;
            this.setAuthTimer(expiresIn / 1000);
            this.isLoggedInStatusListener.next({
                isLoggedIn: true,
            });
        } else {
            this.logout();
        }
    }

    signUp(authData: AuthData) {
        this.httpClient
            .post<{ message: string }>('api/user/signup', { ...authData })
            .subscribe(
                (res) => {
                    console.log('res: ', res);

                    this.isSignedUpStatusListener.next({
                        isSignedUp: true,
                        isSignUpFailed: false,
                        message: res.message,
                    });

                    this.router.navigate(['/login']);
                },
                (error) => {
                    console.log(error);

                    this.isSignedUpStatusListener.next({
                        isSignedUp: false,
                        isSignUpFailed: true,
                        message: error.error.message,
                    });
                },
            );
    }

    login(authData: AuthData) {
        this.httpClient
            .post<AuthResponse>('api/user/login', { ...authData })
            .subscribe(
                (res) => {
                    if (res.token) {
                        this.token = res.token;
                        const tokenValidDuration = res.expiresIn;

                        this.setAuthTimer(tokenValidDuration);

                        const now = new Date();
                        const expDate = new Date(
                            now.getTime() + tokenValidDuration * 1000,
                        );

                        this.saveAuthData(this.token, expDate);

                        this.isAuthenticated = true;

                        this.isLoggedInStatusListener.next({
                            isLoggedIn: true,
                        });

                        this.router.navigate(['/home']);
                    }
                },
                (error) => {
                    this.isAuthenticated = false;

                    this.isLoggedInStatusListener.next({
                        isLoggedIn: false,
                        message: error.error.message,
                    });
                },
            );
    }

    logout() {
        this.token = null;

        this.isAuthenticated = false;

        this.isLoggedInStatusListener.next({
            isLoggedIn: false,
        });

        clearTimeout(this.tokenTimer);
        this.clearAuthData();

        this.router.navigate(['/login']);
    }

    private saveAuthData(token: string, expDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expiration = localStorage.getItem('expiration');

        if (!token || !expiration) {
            return;
        }
        return {
            token,
            expiration: new Date(expiration),
        };
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }
}
