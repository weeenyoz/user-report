import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ReportService } from './report.service';
import {
    ReportInterface,
    CreateReportInterface,
    EditReportInterface,
    ReportFormInterface,
} from './report.model';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit, OnDestroy {
    reportForm: FormGroup;

    private reportsSub: Subscription;
    private isSubmittedSub: Subscription;

    private username: string;
    private isEdit: boolean;
    private reportId: number;
    title: string;
    isApproved: boolean;
    isSubmitted: boolean;
    message: string;

    constructor(
        private reportService: ReportService,
        private authService: AuthService,
        private _location: Location,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.reportForm = new FormGroup({
            date: new FormControl(null),
            username: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(3)],
            }),
            content: new FormControl(null, {
                validators: [Validators.required, Validators.minLength(5)],
            }),
        });

        this.activatedRoute.params.subscribe((data) => {
            const { id } = data;

            this.isEdit = !!id;

            if (this.isEdit) {
                this.reportId = +id;
                this.title = 'Edit';
                this.reportService.getReport(+id);

                this.reportsSub = this.reportService
                    .getReportsListener()
                    .subscribe((report) => {
                        const {
                            date,
                            username,
                            content,
                            approved,
                        } = report as ReportInterface;

                        const formattedDate = ((date as unknown) as string).split(
                            'T',
                        )[0];

                        const reportData = {
                            date: formattedDate,
                            username,
                            content,
                        };

                        this.isApproved = approved;

                        this.setForm(reportData as ReportFormInterface);
                    });
            } else {
                this.title = 'New';
                this.username = this.authService.getUsername();

                this.setForm();
            }
        });

        this.isSubmittedSub = this.reportService
            .getIsSubmittedListener()
            .subscribe((isSubmitted) => {
                if (isSubmitted) {
                    this.isSubmitted = isSubmitted;

                    this.reportForm.controls.content.reset('');
                }
            });
    }

    ngOnDestroy() {
        this.isEdit && this.reportsSub.unsubscribe();
        this.isSubmittedSub.unsubscribe();
    }

    setForm(data?: ReportFormInterface) {
        if (data) {
            this.reportForm.setValue({ ...data });
        } else {
            let date = new Date().toISOString();
            date = date.split('T')[0];

            this.reportForm.controls.username.setValue(this.username);
            this.reportForm.controls.date.setValue(date);
        }
    }

    onSubmit() {
        const { date, username, content } = this.reportForm.value;

        const report: CreateReportInterface | EditReportInterface = {
            id: this.isEdit && this.reportId,
            date,
            username,
            content,
        };

        this.isEdit
            ? this.reportService.editReport(report)
            : this.reportService.createReport(report);
    }

    back() {
        this._location.back();
    }
}
