import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ReportService } from '../report/report.service';
import { ReportInterface } from '../report/report.model';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    private reportsSub: Subscription;

    reports: ReportInterface[];
    isAdmin: boolean;

    constructor(
        private reportService: ReportService,
        private authService: AuthService,
    ) {}

    ngOnInit() {
        this.isAdmin = this.authService.getIsAdmin();

        this.reportService.getReports();

        this.reportsSub = this.reportService
            .getReportsListener()
            .subscribe((reports) => {
                this.reports = reports as ReportInterface[];
            });
    }

    ngOnDestroy() {
        this.reportsSub.unsubscribe();
    }

    onApprove(id: number) {
        this.reportService.approveReport(id);
    }
}
