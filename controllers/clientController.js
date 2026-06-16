const { ObjectId } = require("mongodb")
const utils = require("../utils/utils")
const strings = require("../utils/strings")
const model = require("../models/clientModel")
const accountModel = require("../models/accountModel")
const controller = {}

controller.createClient = async function (req, res, next) {
    const client = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        created_at: new Date()
    }
    const account_id = req.body.account_id
    try {
        const pending = await accountModel.getPendingAccount(new ObjectId(account_id))
        if (!pending) {
            return next(utils.constructError(strings.PENDING_ACCOUNT, 404))
        }
        client.github_id = pending.github_id

        const isRegister = await utils.isRegister(client.github_id)
        if (isRegister) {
            return next(utils.constructError(strings.EXISTED_ACCOUNT, 409))
        }
        const existing = await model.getClientByEmail(client.email)
        if (existing) {
            return next(utils.constructError(strings.CLIENT_EMAIL_EXISTS, 409))
        }
        const result = await model.createClient(client)
        if (result.insertedId) {
            res.status(201).json({ status: true, id: result.insertedId })
        } else {
            return next(utils.constructError(strings.ERROR_ADDING_CLIENT))
        }
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_ADDING_CLIENT))
    }
}

controller.getClients = async function (req, res, next) {
    try {
        const clients = await model.getAllClients()
        res.status(200).json(clients)
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_GETTING_CLIENTS))
    }
}

controller.getClient = async function (req, res, next) {
    try {
        const id = new ObjectId(req.params.id)
        const isContractor = await utils.isContractor(new ObjectId(req._id))
        if (!isContractor) {
            return next(utils.constructError(strings.UNAUTHORIZED_OPERATION, 401))
        }
        const client = await model.getClientById(id)
        if (client) {
            res.status(200).json(client)
        } else {
            return next(utils.constructError(strings.CLIENT_NOT_FOUND, 404))
        }
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_GETTING_CLIENT))
    }
}

controller.updateClient = async function (req, res, next) {
    try {
        const id = new ObjectId(req.params.id)
        const client = await model.getClientById(id)
        if (!client) {
            return next(utils.constructError(strings.CLIENT_NOT_FOUND, 404))
        }
        client.name = req.body.name
        client.email = req.body.email
        client.phone = req.body.phone
        if (client._id.toString() != req._id.toString()) {
            return next(utils.constructError(strings.UNAUTHORIZED_OPERATION, 401))
        }
        const result = await model.updateClient(id, client)
        if (result.modifiedCount === 1) {
            res.status(200).json(utils.sendSuccess(strings.CLIENT_UPDATED))
        } else {
            return next(utils.constructError(strings.ERROR_UPDATING_CLIENT))
        }
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_UPDATING_CLIENT))
    }
}

controller.deleteClient = async function (req, res, next) {
    try {


        const id = new ObjectId(req.params.id)
        const client = await model.getClientById(id)

        if (!client) {
            return next(utils.constructError(strings.CLIENT_NOT_FOUND, 404))
        }
        if (client._id.toString() != req._id.toString()) {
            return next(utils.constructError(strings.UNAUTHORIZED_OPERATION, 401))
        }


        const result = await model.deleteClient(id)

        if (result.deletedCount === 1) {
            res.status(200).json(utils.sendSuccess(strings.CLIENT_DELETED))
        } else {
            return next(utils.constructError(strings.ERROR_DELETING_CLIENT))
        }
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_DELETING_CLIENT))
    }
}

module.exports = controller
