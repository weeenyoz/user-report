const express = require('express');

const {
    createReport,
    editReport,
    getReports,
    getReport,
    approveReport,
} = require('./reportController');
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

const router = express.Router();

router.route('/').get(auth, getReports);
router.route('/new').post(auth, createReport);
router
    .route('/:id')
    .get(auth, getReport)
    .post(auth, admin, approveReport)
    .put(auth, admin, editReport);

module.exports.reportRoutes = router;
