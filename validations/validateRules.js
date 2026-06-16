const { body, param } = require("express-validator")
const strings = require("../utils/strings")
const modelSpecialty = require("../models/estimateModel")
const validateRules = {}

validateRules.createProject = () => {
    return [
        // body("*").escape().trim(),
        body("title").isString().escape().trim().notEmpty().withMessage(strings.TITLE_REQUIRED),
        body("description").isString().escape().trim().notEmpty().withMessage(strings.DESCRIPTION_REQUIRED),
        body("category").isString().escape().trim().notEmpty().withMessage(strings.CATEGORY_REQUIRED),
        body("budget").escape().trim().toInt().isInt().withMessage(strings.BUDGET_NOT_EMPTY),
        body("deadline").isISO8601().withMessage(strings.INVALID_DATE).escape().toDate(),
        body("location").isString().escape().trim()
    ]
}
validateRules.createRate = () => {
    return [
        body("rate").toInt().isInt({ min: 1, max: 5 }).withMessage(strings.NUMERIC_VALUE_RATE),
        body("contractor_id").isString().escape().trim().notEmpty().withMessage(strings.FIELD_REQUIRED).isMongoId().withMessage(strings.MALFORMED_ID),
        body("comment").optional({ checkFalsy: true }).isString().escape().trim()

    ]
}

validateRules.updateRate = () => {
    return [
        body("rate").toInt().isInt({ min: 1, max: 5 }).withMessage(strings.NUMERIC_VALUE_RATE),
        body("comment").optional({ checkFalsy: true }).isString().escape().trim()
    ]
}
validateRules.updateProject = () => {
    return [
        body("title").isString().escape().trim().notEmpty().withMessage(strings.TITLE_REQUIRED),
        body("description").isString().escape().trim().notEmpty().withMessage(strings.DESCRIPTION_REQUIRED),
        body("category").isString().escape().trim().notEmpty().withMessage(strings.CATEGORY_REQUIRED),
        body("budget").escape().trim().toInt().isInt().withMessage(strings.BUDGET_NOT_EMPTY),
        body("deadline").isISO8601().withMessage(strings.INVALID_DATE).escape().toDate(),
        body("location").isString().escape().trim()
    ]
}
validateRules.addWorker = () => {
    return [
        body("*").isString().escape().trim(),
        body("username").notEmpty().withMessage(strings.EMAIL_NOT_EMPTY)
    ]
}
validateRules.updateUser = () => {
    return [
        body("*").isString().escape().trim(),
        body("name").notEmpty().withMessage(strings.NAME_NOT_EMPTY),
    ]
}

validateRules.validateProjectId = () => {
    return [
        body("project_id").isString().escape().trim().notEmpty().withMessage(strings.FIELD_REQUIRED).isMongoId().withMessage(strings.MALFORMED_ID),
    ]
}
validateRules.createEstimate = () => {
    return [
        body("budget").escape().trim().notEmpty().withMessage(strings.BUDGET_NOT_EMPTY).toInt().isInt().withMessage(strings.BUDGET_NOT_EMPTY),
        body("deadline").isISO8601().withMessage(strings.INVALID_DATE).escape().toDate(),
        body("comments").isString().escape().trim()
    ]
}


validateRules.validateId = () => {
    return [
        param("id").isString().escape().trim().isMongoId().withMessage(strings.BAD_REQUEST)
    ]
}

validateRules.validateIdWorker = () => {
    return [
        param("id_worker").isString().escape().trim().isMongoId().withMessage(strings.BAD_REQUEST)
    ]
}


validateRules.account_id = () => {
    return [
        body("account_id").isString().escape().trim().notEmpty().withMessage(strings.FIELD_REQUIRED).isMongoId().withMessage(strings.MALFORMED_ID),
    ]
}
validateRules.createClient = () => {
    return [
        body("name").isString().escape().trim().notEmpty().withMessage(strings.NAME_REQUIRED),
        body("email").isString().escape().trim().notEmpty().withMessage(strings.EMAIL_REQUIRED).isEmail().withMessage(strings.EMAIL_BAD_FORMAT).normalizeEmail(),
        body("phone").optional({ checkFalsy: true }).isString().escape().trim()
    ]
}
validateRules.createContractor = () => {
    return [
        body("bussiness_name").isString().escape().trim().notEmpty().withMessage(strings.FIELD_REQUIRED),
        body("service_area").isString().escape().trim().notEmpty().withMessage(strings.FIELD_REQUIRED),
        body("bio").isString().escape().trim().notEmpty().withMessage(strings.FIELD_REQUIRED),
        body("email").isString().escape().trim().notEmpty().withMessage(strings.EMAIL_REQUIRED).isEmail().withMessage(strings.EMAIL_BAD_FORMAT).normalizeEmail(),
        body("phone_number").isString().escape().trim().notEmpty().withMessage(strings.FIELD_REQUIRED),
        body("specialties").isArray().withMessage(strings.FIELD_REQUIRED)
    ]
}

module.exports = validateRules



