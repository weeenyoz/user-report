export interface ReportInterface {
    id: number;
    userId: number;
    date: Date;
    username: string;
    content: string;
    approved: boolean;
    approvedDateTime: Date;
}

export interface CreateReportInterface
    extends Omit<
        ReportInterface,
        'id' | 'userId' | 'approved' | 'approvedDateTime' | 'date'
    > {
    date: string;
}

export interface EditReportInterface
    extends Omit<
        ReportInterface,
        'userId' | 'approved' | 'approvedDateTime' | 'date'
    > {
    date: string;
}

export interface ReportFormInterface extends CreateReportInterface {}
