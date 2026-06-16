const { ObjectId } = require("mongodb")
const utils = require("../utils/utils")
const strings = require("../utils/strings")
const model = require("../models/contractorModel")
const accountModel = require("../models/accountModel")
const controller = {}


controller.create = async function (req, res, next) {
    const data = req.body
    const contractor = {
        bussiness_name: data.bussiness_name,
        email: data.email,
        service_area: data.service_area,
        bio: data.bio,
        phone_number: data.phone_number,
        specialties: data.specialties
    }

    try {
        const pendingId = data.account_id
        const pending = await accountModel.getPendingAccount(new ObjectId(pendingId))
        if (!pending) {
            return next(utils.constructError(strings.PENDING_ACCOUNT, 404))
        }
        contractor.github_id = pending.github_id

        const isRegister = await utils.isRegister(contractor.github_id)

        if (isRegister) {
            console.log(isRegister)
            return next(utils.constructError(strings.EXISTED_ACCOUNT, 409))
        }
        const existing = await model.getContractorByEmail(contractor.email)

        if (existing) {
            return next(utils.constructError(strings.CLIENT_EMAIL_EXISTS, 409))
        }
        const result = await model.create(contractor)
        if (result.insertedId) {
            res.status(201).json({ status: true, id: result.insertedId })
        } else {
            return next(utils.constructError(strings.ERROR_ADDING_CONTRACTOR))
        }
    } catch (error) {
        console.log(error)
        return next(utils.constructError(strings.ERROR_ADDING_CONTRACTOR))
    }
}


module.exports = controller
