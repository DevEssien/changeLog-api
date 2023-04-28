import { validationResult } from "express-validator";

export const handleInputErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status = 422;
        res.json({
            message: 'Invalid Input!',
            errors: errors.array()
        });
    } else {
        next()
    }
}