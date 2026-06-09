const controller = {}
const e = require("express");
const utils = require("../utils/utils.js")
const strings = require("../utils/strings.js")
const model = require("../models/estimateModel.js")
const projectModel = require("../models/projectModel.js")
const { ObjectId } = require('mongodb');

controller.getEstimate = async function (req, res, next) {
    const id = new ObjectId(req.params.id)
    try {
        const estimate = await model.getEstimateById(id)
        if (estimate) {
            res.status(200).json(estimate)

        } else {
            return next(utils.constructError(strings.ESTIMATE_NOT_FOUND))
        }

    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_GETTING_ESTIMATE))

    }

}

controller.createEstimate = async function (req, res, next) {
    const id_user = new ObjectId(req._id)
    const project_id = new ObjectId(req.body.project_id)
    try {
        const estimate = await model.getEstimateByContractor(id_user, project_id)
        if (!estimate) {
            const project = await projectModel.getProject(project_id)
            if (project) {
                if (project.status != "open") {
                    return next(utils.constructError(strings.PROJECT_NOT_AVAILABLE, 409))
                }
                const estimate = {
                    project_id: project_id,
                    contractor_id: id_user,
                    budget: req.body.budget,
                    deadline: req.body.deadline,
                    comments: req.body.comments
                }
                const result = await model.insertEstimate(estimate)
                if (result.insertedId) {
                    res.status(200).json({ status: true, id: result.insertedId })
                } else {
                    return next(utils.constructError(strings.ERROR_ADDING_ESTIMATE))
                }
            } else {
                return next(utils.constructError(strings.PROJECT_NOT_FOUND, 404))
            }

        } else {
            return next(utils.constructError(strings.ESTIMATE_SENT, 409))
        }
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_ADDING_ESTIMATE))
    }


}
controller.updateEstimate = async function (req, res, next) {
    const estimate_id = new ObjectId(req.params.id)
    const data = req.body
    try {
        const estimate = await model.getEstimateById(estimate_id)
        if (estimate) {
            const isCreator = estimate.contractor_id.toString() == req._id.toString()
            if (isCreator) {
                estimate.budget = data.budget
                estimate.deadline = data.deadline
                estimate.comments = data.comments
                const result = await model.updateEstimate(estimate_id, estimate)
                if (result.modifiedCount == 1) {
                    res.status(200).json(utils.sendSuccess(strings.ESTIMATE_UPDATED))
                } else {
                    return next(utils.constructError(strings.ERROR_UPDATING_ESTIMATE))
                }

            } else {
                return next(utils.constructError(strings.UNAUTHORIZED_OPERATION, 401))
            }

        } else {
            return next(utils.constructError(strings.ESTIMATE_NOT_FOUND, 404))
        }
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_ADDING_ESTIMATE))
    }


}
controller.deleteEstimate = async function (req, res, next) {
    const estimate_id = new ObjectId(req.params.id)
    const data = req.body
    try {
        const estimate = await model.getEstimateById(estimate_id)
        if (estimate) {
            const isCreator = estimate.contractor_id.toString() == req._id.toString()
            if (isCreator) {
                const result = await model.deleteEstimate(estimate_id)
                if (result.deletedCount == 1) {
                    res.status(200).json(utils.sendSuccess(strings.ESTIMATE_DELETED))
                } else {
                    return next(utils.constructError(strings.ERROR_DELETING_ESTIMATE))
                }

            } else {
                return next(utils.constructError(strings.UNAUTHORIZED_OPERATION, 401))
            }

        } else {
            return next(utils.constructError(strings.ESTIMATE_NOT_FOUND, 404))
        }
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_DELETING_ESTIMATE))
    }


}


module.exports = controller
