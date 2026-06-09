const express = require("express")
const router = new express.Router();
const validator = require("../validations/validator")
const validateRules = require("../validations/validateRules")
const controller = require("../controllers/estimateController")


router.post('/', validateRules.validateProjectId(), validateRules.createEstimate(), validator.validateData, controller.createEstimate)
router.get("/:id", validateRules.validateId(), validator.validateData, controller.getEstimate)
router.put("/:id", validateRules.validateId(), validateRules.createEstimate(), validator.validateData, controller.updateEstimate)
router.delete('/:id', validateRules.validateId(), validator.validateData, controller.deleteEstimate)




module.exports = router
