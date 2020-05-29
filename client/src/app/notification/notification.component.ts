import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})
export class Notification {
    @Input('isSuccess') isSuccess: boolean;
    @Input('isError') isError: boolean;
    @Input('message') message: string;
}
