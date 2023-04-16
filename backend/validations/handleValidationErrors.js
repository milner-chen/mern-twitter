// returns any errors if validations fail

const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) { // if there are errors
        const errorFormatter = ({ msg }) => msg;
        // format errors
        const errors = validationErrors.formatWith(errorFormatter).mapped();

        const err = Error("Validation Error");
        err.errors = errors;
        err.statusCode = 400;
        err.title = "Validation Error";
        next(err);
    };
    next();
}

module.exports = handleValidationErrors;