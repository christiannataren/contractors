const db = require("./db")
const collection = "contractors"
const { ObjectId } = require("mongodb")
const model = {}


model.create = async function (contractor) {
    const result = await db.insertData(collection, contractor)
    return result
}

model.getByGithubId = async function (githubId) {
    const contractor = await db.getOne(collection, { github_id: githubId })
    return contractor
}

model.getContractorByEmail = async function (email) {
    const contractor = await db.getOne(collection, { email })
    return contractor
}


model.getById = async function (id) {
    const contractor = await db.getByID(collection, id)
    return contractor
}

module.exports = model
