const db = require("./db")
const collection = "estimates"
const { ObjectId } = require("mongodb")
const model = {}

model.insertEstimate = async function (estimate) {
    const spec = await db.insertData(collection, estimate)
    return spec
}
model.updateEstimate = async function (id, estimate) {
    const spec = await db.updateByID(collection, id, estimate)
    return spec
}



model.getEstimateByContractor = async function (id_user, project_id) {
    const estimate = await db.getOne(collection, { contractor_id: id_user, project_id: project_id })
    return estimate
}
model.deleteEstimate = async function (id) {
    const result = await db.deleteByID(collection, id)
    return result
}

model.getEstimateById = async function (id) {
    const estimate = await db.getByID(collection, id)
    return estimate

}

module.exports = model
