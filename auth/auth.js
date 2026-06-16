
require('dotenv').config()
const { env } = require('node:process')
const strings = require("../utils/strings")
const utils = require("../utils/utils")
auth = {}
const ObjectId = require("mongodb")
const { use } = require("passport")

const jwt = require('jsonwebtoken');


let publicPaths = [
    { path: "/clients", method: "POST" },
    { path: "/clients/", method: "POST" },
    { path: "/contractors", method: "POST" },
    { path: "/contractors/", method: "POST" },
    { path: "/api-docs/", method: "POST" },
    { path: "/api-docs/", method: "GET" },
    { path: "/login/", method: "POST" },
    { path: "/login", method: "GET" },
    { path: "/github/callback/", method: "GET" },
    { path: "/", method: "GET" },
    { path: "/github/callback", method: "GET" }
]


auth.verifySesion = async function (req, res, next) {
    try {
        const tk = req.header('Authorization');
        if (tk) {
            const token = tk.split(" ")[1]
            const decoded = jwt.verify(token, env.JWTOKEN);
            if (decoded) {
                req._id = decoded.userId
            }
        }
    } catch (error) {
        console.log(error)
        // return next(utils.constructError(strings.NOT_AUTHENTICATED))
    }
    let publicAccess = publicPaths.some(url =>
        url.path == req.path && url.method == req.method
    )
    if (req.path.includes("api-docs")) {
        try {
            if (req.path.split("/")[1] == "api-docs") {
                publicAccess = true
            }
        } catch {

        }

    }

    // req._id = "6a26e0650a53e1d3df58454b"
    if (req._id || publicAccess) {
        next()
    } else {
        next(utils.constructError(strings.UNAUTHORIZED, 401))
    }
}

module.exports = auth
