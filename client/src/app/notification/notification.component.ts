import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class Notification {
    @Input('isSignedUp') isSignedUp: boolean;
    @Input('isSignUpFailed') isSignUpFailed: boolean;
    @Input('message') message: string;
}
