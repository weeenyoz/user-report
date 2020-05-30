import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Input('isLoggedIn') isLoggedIn: boolean;

    constructor(private authService: AuthService) {}

    ngOnInit() {}

    ngOnDestroy() {}

    logout() {
        this.authService.logout();
    }
}
