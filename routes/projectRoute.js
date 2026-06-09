const express = require("express")
const router = new express.Router();
const validator = require("../validations/validator")
const validateRules = require("../validations/validateRules")
const controller = require("../controllers/projectController")

router.post("/", validateRules.createProject(), validator.validateData, controller.createProject)
router.get("/", controller.getProjects)
router.put("/:id", validateRules.validateId(), validateRules.updateProject(), validator.validateData, controller.updateProject)
router.delete("/:id", validateRules.validateId(), validator.validateData, controller.deleteProject)
router.get("/:id", validateRules.validateId(), validator.validateData, controller.getProject)


module.exports = router
