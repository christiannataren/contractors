const db = require("./db")
const collection = "rates"

const model = {}

model.create = async function (entity) {
    const result = await db.insertData(collection, entity)
    return result
}

model.getByClientId = async function (clientId) {
    const result = await db.getAllFilter(collection, { client_id: clientId })
    return result
}

model.getById = async function (rateId) {
    const result = await db.getByID(collection, rateId)
    return result
}

model.deleteById = async function (id) {
    const result = await db.deleteByID(collection, id);
    return result
}
model.updateById = async function (rateId, updates) {
    const result = await db.updateByID(collection, rateId, updates)
    return result
}

module.exports = model
