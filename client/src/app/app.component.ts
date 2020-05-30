import { Component, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'client';
    isLoggedInListenerSubs: Subscription;
    isSignedUpListenerSubs: Subscription;

    @Output('isLoggedIn') isLoggedIn: boolean;
    @Output('isSuccess') isSuccess: boolean;
    @Output('isError') isError: boolean;
    @Output('message') message: string;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.autoAuthUser();

        this.isLoggedIn = this.authService.getIsAuth();

        this.isLoggedInListenerSubs = this.authService
            .getIsLoggedInStatusListener()
            .subscribe((data) => {
                const { isLoggedIn, message } = data;

                this.message = message && message;
                this.isLoggedIn = isLoggedIn;
                this.isSuccess = isLoggedIn;
                this.isError = !isLoggedIn;
            });

        this.isSignedUpListenerSubs = this.authService
            .getIsSignedUpStatusListener()
            .subscribe((data) => {
                const { isSignedUp, isSignUpFailed, message } = data;

                this.message = message;
                this.isSuccess = isSignedUp;
                this.isError = isSignUpFailed;
            });
    }

    ngOnDestroy() {
        this.isLoggedInListenerSubs.unsubscribe();
        this.isSignedUpListenerSubs.unsubscribe();
    }
}
