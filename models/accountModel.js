const db = require("./db")
const collection = "PendingAccounts"
const { ObjectId } = require("mongodb")
const model = {}


model.create = async function (account) {
    const result = await db.insertData(collection, account)
    return result
}

model.getByGithubId = async function (githubId) {
    const account = await db.getOne(collection, { github_id: githubId })
    return account
}
model.delete = async function (id) {
    const account = await db.deleteByID(collection, id)
    return account
}
model.getPendingAccount = async function (id) {
    const pending = await db.getByID(collection, id)
    return pending
}

module.exports = model
