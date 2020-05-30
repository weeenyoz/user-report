import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    @Input('isLoggedIn') isLoggedIn: boolean;

    constructor() {}

    ngOnInit() {}

    ngOnDestroy() {}
}
