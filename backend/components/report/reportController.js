const { reports } = require('./reports');

/**
 * POST create a new report
 * /api/reports/new
 */
module.exports.createReport = (req, res) => {
    const { date, username, content } = req.body;

    const newReport = {
        id: reports.length + 1,
        userId: req.user.userId,
        date,
        username,
        content,
        approved: false,
    };

    reports.push(newReport);

    res.status(201).json({ report: newReport });
};

/**
 * PUT edit a report
 * /api/reports/:id
 */
module.exports.editReport = (req, res) => {
    const { id, content } = req.body;

    let report = reports.find((report) => report.id === +id);

    if (!report) {
        res.status(404).json({ message: 'No report found' });
    }

    report.content = content;

    res.status(200).json({ report });
};

/**
 * GET all reports
 * /api/reports/
 */
module.exports.getReports = (req, res) => {
    if (req.user.isAdmin === false) {
        const userReports = reports.filter(
            (report) =>
                report.userId === req.user.userId && report.approved === true,
        );

        res.status(200).json({ reports: userReports });
    } else {
        res.status(200).json({ reports });
    }
};

/**
 * GET one report by id
 * /api/reports/id
 */
module.exports.getReport = (req, res) => {
    const { id } = req.params;

    const report = reports.find((report) => report.id === +id);

    report
        ? res.status(200).json({ report })
        : res.status(404).json({ message: 'Report not found ' });
};

module.exports.approveReport = (req, res) => {
    const { id } = req.params;
    const { isApprove } = req.body;

    let approvedDateTime = new Date();

    const report = reports.find((report) => report.id === +id);
    report.approved = isApprove;
    report.approvedDateTime = approvedDateTime;

    res.status(200).json({ reports });
};
