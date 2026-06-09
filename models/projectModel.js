const db = require("../models/db")
const collection = "projects"

const model = {}

model.createProject = async function (project) {
    const result = await db.insertData(collection, project)
    return result
}

model.getProject = async function (id) {
    const project = await db.getByID(collection, id)
    return project
}

model.deleteProject = async function (id) {
    const result = await db.deleteByID(collection, id)
    return result
}

model.updateProject = async function (id, data) {
    const update = await db.updateByID(collection, id, data)
    return update
}

model.getProjectsByContractor = async function (idContractor) {

    const projects = await db.getAllFilter(collection, { contractorId: idContractor })
    return projects
}
model.getOpenedProjects = async function () {
    const projects = await db.getAllFilter(collection, { status: "open" })
    return projects
}



model.getProjectsByUser = async function (userId) {
    const projects = await db.getAllFilter(collection, { created_by: userId })
    return projects

}
module.exports = model
