const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateTweetInput = [
    check('text')
        .exists({ checkFlasy: true })
        .isLength({ min: 5, max: 140 })
        .withMessage('Tweet must be between 5 and 140 characters'),
    handleValidationErrors
];

module.exports = validateTweetInput;