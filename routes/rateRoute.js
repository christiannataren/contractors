const express = require("express")
const router = new express.Router();
const validator = require("../validations/validator")
const validateRules = require("../validations/validateRules")
const controller = require("../controllers/rateController")

router.post("/", validateRules.createRate(), validator.validateData, controller.createRate)
router.get("/", controller.getRates)
router.put("/:id", validateRules.validateId(), validateRules.updateRate(), validator.validateData, controller.updateRate)
router.delete("/:id", validateRules.validateId(), validator.validateData, controller.deleteRate)



module.exports = router
