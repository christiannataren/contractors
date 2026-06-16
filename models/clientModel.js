const db = require("./db")
const collection = "clients"
const { ObjectId } = require("mongodb")
const model = {}



model.createClient = async function (client) {
    const result = await db.insertData(collection, client)
    return result
}

model.getClientById = async function (id) {
    const client = await db.getByID(collection, id)
    return client
}

model.getClientByEmail = async function (email) {
    const client = await db.getOne(collection, { email })
    return client
}

model.getClientByGithubId = async function (githubId) {
    const client = await db.getOne(collection, { github_id: githubId })
    return client
}
model.getAllClients = async function () {
    const clients = await db.getAll(collection)
    return clients
}

model.updateClient = async function (id, data) {
    const result = await db.updateByID(collection, id, data)
    return result
}

model.deleteClient = async function (id) {
    const result = await db.deleteByID(collection, id)
    return result
}

module.exports = model
