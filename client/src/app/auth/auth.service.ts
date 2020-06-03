import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { SignUpData, LoginData } from './user.model';
import { AuthResponse, LoginResponse, SignUpResponse } from './auth.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private isSignedUpStatusListener = new Subject<SignUpResponse>();
    private isLoggedInStatusListener = new Subject<LoginResponse>();

    private tokenTimer: any;
    private isAdmin: boolean;
    private username: string;

    private isAuthenticated = false;
    private token = '';

    constructor(private httpClient: HttpClient, public router: Router) {}

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getIsAdmin() {
        return this.isAdmin;
    }

    getUsername() {
        return this.username;
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

        const { token, expiration, role } = authInfo;

        role === 'admin' ? (this.isAdmin = true) : (this.isAdmin = false);

        const now = new Date();
        const expiresIn = expiration.getTime() - now.getTime();

        const isNotExpired = expiresIn > 0 ? true : false;

        if (isNotExpired) {
            this.token = token;

            this.isAuthenticated = true;

            this.setAuthTimer(expiresIn / 1000);

            this.isLoggedInStatusListener.next({
                isLoggedIn: true,
                isAdmin: this.isAdmin,
            });
        } else {
            this.logout();
        }
    }

    signUp(signUpData: SignUpData) {
        this.httpClient
            .post<{ message: string }>('api/user/signup', { ...signUpData })
            .subscribe(
                (res) => {
                    this.isSignedUpStatusListener.next({
                        isSignedUp: true,
                        message: res.message,
                    });

                    this.router.navigate(['/login']);
                },
                (error) => {
                    console.log(error);

                    this.isSignedUpStatusListener.next({
                        isSignedUp: false,
                        message: error.error.message,
                    });
                },
            );
    }

    login(loginData: LoginData) {
        this.httpClient
            .post<AuthResponse>('api/user/login', { ...loginData })
            .subscribe(
                (res) => {
                    if (res.token) {
                        const { token, expiresIn, isAdmin } = res;

                        this.token = token;
                        const tokenValidDuration = expiresIn;

                        this.setAuthTimer(tokenValidDuration);

                        const now = new Date();
                        const expDate = new Date(
                            now.getTime() + tokenValidDuration * 1000,
                        );

                        this.saveAuthData(this.token, expDate, isAdmin);

                        this.isAuthenticated = true;

                        this.isAdmin = isAdmin;

                        this.username = loginData.username;

                        this.isLoggedInStatusListener.next({
                            isLoggedIn: true,
                            isAdmin,
                        });

                        this.router.navigate(['/home']);
                    }
                },
                (error) => {
                    console.log('error in login: ', error);
                    this.isAuthenticated = false;

                    this.isLoggedInStatusListener.next({
                        isLoggedIn: false,
                        message: error.error.message,
                        isAdmin: false,
                    });
                },
            );
    }

    logout() {
        this.token = '';

        this.isAuthenticated = false;

        this.isLoggedInStatusListener.next({
            isLoggedIn: false,
            isAdmin: false,
        });

        clearTimeout(this.tokenTimer);
        this.clearAuthData();

        this.router.navigate(['/login']);
    }

    private saveAuthData(token: string, expDate: Date, isAdmin: boolean) {
        localStorage.setItem('token', token);
        localStorage.setItem('role', isAdmin ? 'admin' : 'non-admin');
        localStorage.setItem('expiration', expDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('expiration');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const expiration = localStorage.getItem('expiration');

        if (!token || !expiration) {
            return;
        }
        return {
            token,
            role,
            expiration: new Date(expiration),
        };
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }
}
