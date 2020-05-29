import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    isLoggedIn = false;
    isLoggedInListenerSubs: Subscription;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.isLoggedInListenerSubs = this.authService
            .getIsLoggedInStatusListener()
            .subscribe((isAuthenticated) => (this.isLoggedIn = isAuthenticated));
    }

    ngOnDestroy() {
        this.isLoggedInListenerSubs.unsubscribe();
    }
}
