
const utils = {}
const clientModel = require("../models/clientModel")
const contractorModel = require("../models/contractorModel")

utils.constructError = function (message, error = 500) {

    message = message.errors || message
    return {
        message: message,
        status: error,
        custom: true
    }
}

utils.sendSuccess = function (message) {
    return { status: true, message: message }
}

utils.isMemberContractor = function (user_id, contractor) {
    return contractor.user.toString == user_id.toString() || contractor.members.some(member => member._id.toString() == user_id.toString())
}

utils.isOwnerContractor = function (user_id, contractor) {

    return contractor.user.toString() == user_id.toString()
}


utils.isContractor = async function (user_id) {
    console.log("COntractor: " + user_id)
    const contractor = await contractorModel.getById(user_id)
    return contractor
}

utils.isRegister = async function (githubId) {
    const client = await clientModel.getClientByGithubId(githubId)
    const contractor = await contractorModel.getByGithubId(githubId)
    if (client) {
        return client
    }
    if (contractor) {
        return contractor
    }


    return false

}
module.exports = utils
