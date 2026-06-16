const express = require("express")
const router = new express.Router()
const validator = require("../validations/validator")
const validateRules = require("../validations/validateRules")
const controller = require("../controllers/clientController")



router.post("/", validateRules.createClient(), validateRules.account_id(), validator.validateData, controller.createClient)
router.get("/", controller.getClients)
router.get("/:id", validateRules.validateId(), validator.validateData, controller.getClient)
router.delete("/:id", validateRules.validateId(), validator.validateData, controller.deleteClient)

router.put("/:id", validateRules.validateId(), validateRules.createClient(), validator.validateData, controller.updateClient)

module.exports = router
