import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
    templateUrl: './login-signup.component.html',
    styleUrls: ['./login-signup.component.scss'],
})
export class LoginSignupComponent implements OnInit, OnDestroy {
    title: string;
    isFormInvalid: boolean;
    isEmailInputInvalid: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        this.activatedRoute.url.subscribe((data) => {
            const url = data[0].path;

            url === 'login' ? (this.title = 'Login') : (this.title = 'Sign Up');
        });
    }

    ngOnDestroy() {}

    onSubmit(form: NgForm) {
        this.isFormInvalid = form.invalid;

        if (form.invalid) {
            return;
        }

        const { email, password } = form.value;

        let user = {
            email,
            password,
        };

        this.title === 'Login'
            ? this.authService.login(user)
            : this.authService.signUp(user);
    }
}
