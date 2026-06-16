const { ObjectId } = require("mongodb")
const utils = require("../utils/utils")
const strings = require("../utils/strings")
const model = require("../models/rateModel")
const e = require("express")
const controller = {}

controller.createRate = async function (req, res, next) {
    const data = req.body;
    const rate = {
        client_id: req._id,
        rate: data.rate,
        contractor_id: new ObjectId(data.contractor_id),
        comment: data.comment
    };

    try {
        const result = await model.create(rate);

        if (result.insertedId) {
            res.status(200).json(utils.sendSuccess(strings.RATE_ADDED));
        } else {
            return next(utils.constructError(strings.ERROR_ADDING_RATE));
        }
    } catch (error) {
        console.log(error);
        return next(utils.constructError(strings.ERROR_ADDING_RATE));
    }
}

controller.getRates = async function (req, res, next) {
    try {
        const rates = await model.getByClientId(req._id)
        res.status(200).json(rates)
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_GETTING_RATE))
    }
}

controller.deleteRate = async function (req, res, next) {
    const id = new ObjectId(req.params.id)
    try {
        const rate = await model.getById(id)
        if (rate) {
            if (rate.client_id.toString() === req._id) {

                const deleted = await model.deleteById(id)
                if (deleted.deletedCount == 1) {
                    res.status(200).json({ status: true, message: strings.RATE_DELETED })
                } else {
                    return next(utils.constructError(strings.ERROR_DELETING_RATE))
                }

            } else {
                return next(utils.constructError(strings.UNAUTHORIZED_OPERATION, 401))
            }
        } else {
            return next(utils.constructError(strings.RATE_NOT_FOUND, 404))
        }
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_GETTING_RATE))
    }

}

controller.updateRate = async function (req, res, next) {
    try {
        const rateId = new ObjectId(req.params.id)
        const existingRate = await model.getById(rateId)

        if (!existingRate) {
            return next(utils.constructError(strings.RATE_NOT_FOUND, 404))
        }

        if (existingRate.client_id?.toString() !== req._id?.toString()) {
            return next(utils.constructError(strings.UNAUTHORIZED_OPERATION, 401))
        }

        const updates = {}

        if (req.body.rate !== undefined) {
            updates.rate = req.body.rate
        }

        if (req.body.comment !== undefined) {
            updates.comment = req.body.comment
        }

        if (Object.keys(updates).length === 0) {
            return next(utils.constructError(strings.BAD_REQUEST, 400))
        }

        const result = await model.updateById(rateId, updates)
        if (result.modifiedCount > 0 || result.matchedCount > 0) {
            res.status(200).json(utils.sendSuccess(strings.RATE_UPDATED))
        } else {
            return next(utils.constructError(strings.ERROR_UPDATING_RATE))
        }
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_UPDATING_RATE))
    }
}

module.exports = controller
