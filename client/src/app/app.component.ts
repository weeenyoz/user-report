import { Component, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { ReportService } from './report/report.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'client';
    isSubmitted: boolean;
    isLoggedInListenerSubs: Subscription;
    isSignedUpListenerSubs: Subscription;
    isSubmittedSub: Subscription;

    @Output('isLoggedIn') isLoggedIn: boolean;
    @Output('isSuccess') isSuccess: boolean;
    @Output('isError') isError: boolean;
    @Output('message') message: string;

    constructor(
        private authService: AuthService,
        private reportService: ReportService,
    ) {}

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
                const { isSignedUp, message } = data;

                this.message = message;
                this.isSuccess = isSignedUp;
                this.isError = !isSignedUp;
            });

        this.isSubmittedSub = this.reportService
            .getIsSubmittedListener()
            .subscribe((res) => {
                this.isSubmitted = res;
                this.isSuccess = this.isSubmitted;
                this.isError = !this.isSubmitted;
                this.isSubmitted
                    ? (this.message = 'Report Submitted - Pending Approval')
                    : (this.message =
                          'An error occurred, unable to submit report');
            });
    }

    ngOnDestroy() {
        this.isLoggedInListenerSubs.unsubscribe();
        this.isSignedUpListenerSubs.unsubscribe();
    }
}
