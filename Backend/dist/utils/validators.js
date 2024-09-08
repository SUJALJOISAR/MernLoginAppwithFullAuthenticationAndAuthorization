"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidator = exports.loginValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty())
                break;
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    };
};
exports.validate = validate;
//validationResult() and ValidationChain[] are the functions predefined in express-validator package.
exports.loginValidator = [
    (0, express_validator_1.body)("email").trim().isEmail().withMessage("Email is Required"),
    (0, express_validator_1.body)("password").trim().isLength({ min: 6 }).withMessage("Password must atleast 6 characters ")
];
exports.signupValidator = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is Required"),
    (0, express_validator_1.body)("email").trim().isEmail().withMessage("Invalid Email"),
    (0, express_validator_1.body)("password").trim().isLength({ min: 6 }).withMessage("Password must be atleast 6 characters")
];
//# sourceMappingURL=validators.js.map