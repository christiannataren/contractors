const { ObjectId } = require("mongodb")
const utils = require("../utils/utils")
const strings = require("../utils/strings")
const model = require("../models/projectModel")
const e = require("express")
const controller = {}

controller.createProject = async function (req, res, next) {
    const project = {

        created_by: new ObjectId(req._id),
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        budget: req.body.budget,
        status: "open",
        deadline: req.body.deadline,
        created_at: new Date(),
        taken_by: "",
        location: req.body.location
    }
    try {
        const result = await model.createProject(project)
        if (result.insertedId) {
            res.status(200).json({ status: true, id: result.insertedId })
        } else {
            return next(utils.constructError(strings.ERROR_ADDING_PROJECT))
        }
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_ADDING_PROJECT))
    }
}

controller.deleteProject = async function (req, res, next) {
    try {
        const user_id = new ObjectId(req._id)
        const project_id = new ObjectId(req.params.id)
        const project = await model.getProject(project_id)
        if (!project) {
            return next(utils.constructError(strings.PROJECT_NOT_FOUND, 404))
        }

        const isCreator = project.created_by.toString() === user_id.toString()
        if (!isCreator) {
            return next(utils.constructError(strings.UNAUTHORIZED_OPERATION, 401))
        }

        const result = await model.deleteProject(project_id)
        if (result.deletedCount === 1) {
            res.status(200).json(utils.sendSuccess(strings.PROJECT_DELETED))
        } else {
            return next(utils.constructError(strings.PROJECT_NOT_FOUND, 404))
        }
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_REMOVING_PROJECT))
    }
}
controller.updateProject = async function (req, res, next) {
    try {
        const user_id = new ObjectId(req._id)
        const project_id = new ObjectId(req.params.id)
        const content = req.body

        const project = await model.getProject(project_id)
        if (!project) {
            return next(utils.constructError(strings.PROJECT_NOT_FOUND, 404))
        }

        const isCreator = project.created_by.toString() === user_id.toString()
        if (!isCreator) {
            return next(utils.constructError(strings.UNAUTHORIZED_OPERATION, 401))
        }
        project.title = content.title;
        project.description = content.description;
        project.category = content.category;
        project.budget = content.budget;
        project.deadline = content.deadline;
        project.location = content.location;
        const result = await model.updateProject(project_id, project)
        if (result.modifiedCount == 1) {
            res.status(200).json(utils.sendSuccess(strings.PROJECT_UPDATED))
        } else {
            return next(utils.constructError(strings.ERROR_UPDATING_PROJECT))
        }

    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_UPDATING_PROJECT))
    }
}

controller.getProjects = async function (req, res, next) {
    // const idUser = req._id
    try {
        const projects = await model.getOpenedProjects()
        res.status(200).json(projects)
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_GETTING_PROJECTS))
    }
}

controller.getProject = async function (req, res, next) {
    const idProject = req.params.id
    try {
        const project = await model.getProject(new ObjectId(idProject))
        if (project) {
            res.status(200).json(project)
        } else {
            return next(utils.constructError(strings.PROJECT_NOT_FOUND, 404))
        }

    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_GETTING_PROJECT))
    }
}

module.exports = controller
