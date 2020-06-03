import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';
import { LoginData, SignUpData } from './user.model';

@Component({
    templateUrl: './login-signup.component.html',
    styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit, OnDestroy {
    title: string;
    isFormInvalid: boolean;
    isEmailInputInvalid: boolean;
    isLogin: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        this.activatedRoute.url.subscribe((data) => {
            const url = data[0].path;

            if (url === 'login') {
                this.isLogin = true;
                this.title = 'Login';
            } else {
                this.isLogin = false;
                this.title = 'Sign Up';
            }
        });
    }

    ngOnDestroy() {}

    onSubmit(form: NgForm) {
        this.isFormInvalid = form.invalid;

        if (form.invalid) {
            return;
        }

        const { username, email, password } = form.value;

        let user: LoginData | SignUpData = {
            username,
            password,
        };

        if (this.isLogin) {
            this.authService.login(user);
        } else {
            (user as SignUpData).email = email;
            this.authService.signUp(user as SignUpData);
        }
    }
}
