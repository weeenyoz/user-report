import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import {
    ReportInterface,
    CreateReportInterface,
    EditReportInterface,
} from './report.model';

@Injectable({ providedIn: 'root' })
export class ReportService {
    reportsListener = new Subject<
        ReportInterface[] | Omit<ReportInterface, 'id'>
    >();
    isSubmmitedListener = new Subject<boolean>();

    reports: ReportInterface[];
    isSubmmited: boolean;

    constructor(private http: HttpClient) {}

    getReportsListener() {
        return this.reportsListener.asObservable();
    }

    getIsSubmittedListener() {
        return this.isSubmmitedListener.asObservable();
    }

    getReports() {
        this.http.get<{ reports: ReportInterface[] }>(`api/reports/`).subscribe(
            ({ reports }) => {
                this.reports = reports;
                this.reportsListener.next(reports);
            },
            (error) => console.log('error in get all reports: ', error),
        );
    }

    getReport(id: number) {
        this.http
            .get<{ report: ReportInterface }>(`api/reports/${id}`)
            .subscribe(
                ({ report }) => {
                    this.reportsListener.next(report);
                },
                (error) => console.log(error),
            );
    }

    createReport(report: CreateReportInterface) {
        this.http
            .post<{ report: ReportInterface }>('api/reports/new', { ...report })
            .subscribe(
                (res) => {
                    this.reports.push(res.report);
                    this.reportsListener.next(this.reports);
                    this.isSubmmitedListener.next(true);
                },
                (error) => {
                    console.log(error);
                    this.isSubmmitedListener.next(false);
                },
            );
    }

    editReport(report: EditReportInterface) {
        this.http
            .put<{ report: ReportInterface }>('api/reports/:id', { ...report })
            .subscribe(
                (res) => {
                    this.reports.push(res.report);
                    this.reportsListener.next(this.reports);
                    this.isSubmmitedListener.next(true);
                },
                (error) => console.log(error),
            );
    }

    approveReport(id: number) {
        const data = {
            isApprove: true,
        };

        this.http
            .post<{ reports: ReportInterface[] }>(`api/reports/${id}`, data)
            .subscribe(
                ({ reports }) => {
                    this.reportsListener.next(reports);
                },
                (errpr) => console.log('errpr in approveReport: ', errpr),
            );
    }
}
