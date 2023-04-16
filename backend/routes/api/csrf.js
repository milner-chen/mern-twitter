const express = require('express');
const router = express.Router();

const { isProduction } = require('../../config/keys');

if (!isProduction) {
    // access the csrf token while in development
    router.get("/restore", (req, res) => {
        const csrfToken = req.csrfToken();
        res.status(200).json({
            'CSRF-Token': csrfToken
        });
    });
}

module.exports = router;