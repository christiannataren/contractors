
const utils = {}

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

module.exports = utils
