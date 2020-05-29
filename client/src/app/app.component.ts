import { Component, OnInit, OnDestroy, Output } from '@angular/core';
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
    @Output('isSignedUp') isSignedUp: boolean;
    @Output('message') message: string;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.isLoggedInListenerSubs = this.authService
            .getIsLoggedInStatusListener()
            .subscribe((isAuthenticated) => (this.isLoggedIn = isAuthenticated));

        this.isSignedUpListenerSubs = this.authService
            .getIsSignedUpStatusListener()
            .subscribe((data) => {
                this.message = data.message;
                this.isSignedUp = data.isSignedUp;
            });
    }

    ngOnDestroy() {
        this.isLoggedInListenerSubs.unsubscribe();
        this.isSignedUpListenerSubs.unsubscribe();
    }
}
