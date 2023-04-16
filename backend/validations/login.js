const { check } = require("express-validator");
const handleValidationErrors = require("./handleValidationErrors");

const validateLoginInput = [
    check('email')
        .exists({ checkFalsy: true }) // present
        .isEmail()  // email format
        .withMessage('Email is invalid'), // message
    check('password')
        .exists({ checkFalsy: true }) // present
        .isLength({ min: 6, max: 30 }) // length
        .withMessage('Password must be between 6 and 30 characters'), // msg
    handleValidationErrors
];

module.exports = validateLoginInput;