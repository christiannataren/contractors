require('dotenv').config();
const { env } = require('node:process');

const db = require("./models/db.js")
const accountModel = require("./models/accountModel.js")

const express = require('express')
const app = express()
const estimateRoute = require("./routes/estimateRoute.js")
const projectsRoute = require("./routes/projectRoute.js")
const ratesRoute = require("./routes/rateRoute.js")
const clientsRoute = require("./routes/clientRoute.js")
const contractorsRoute = require("./routes/contractorRoute.js")

const auth = require("./auth/auth.js")
const swaggerUi = require('swagger-ui-express');
const cors = require("cors")
const swaggerDocument = require('./swagger.json');
const GitHubStrategy = require("passport-github2").Strategy
const passport = require("passport")
const session = require("express-session")
const utils = require('./utils/utils.js');
const strings = require('./utils/strings.js');
const { ObjectId } = require('mongodb');
const jwt = require("jsonwebtoken");
const { register } = require('node:module');

app.use(express.json())

app.use(session({
    secret: env.SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.session())
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))

app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return next(utils.constructError("Malformed JSON"));
    }
    next(err);
});

app.use(auth.verifySesion)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/projects", projectsRoute)
app.use("/estimates", estimateRoute)
app.use("/rates", ratesRoute)
app.use("/clients", clientsRoute)
app.use("/contractors", contractorsRoute)





app.get("/login", (req, res, next) => {
    //#swagger.ignore = true
    next();

}, passport.authenticate('github'), (req, res) => { })
app.get("/", (req, res, next) => {
    //#swagger.ignore = true
    next();

}, home)
app.get("/github/callback", (req, res, next) => {
    //#swagger.ignore = true
    next();

}, passport.authenticate('github', {
    failureRedirect: "/api-docs", session: false
})
    , async (req, res, next) => {
        try {
            req.session.user = req.user;
            // queso.hola()
            const isRegister = await utils.isRegister(req.user.id)
            if (isRegister) {
                const secret = env.JWTOKEN
                let data = {
                    time: Date(),
                    userId: isRegister._id.toString(),
                }
                const token = jwt.sign(data, secret, { expiresIn: '1d' });
                res.status(200).json({ accessToken: token })

            } else {
                const pendingAccount = await accountModel.getByGithubId(req.user.id)
                if (pendingAccount) {
                    res.status(200).json({ login: true, id_account: pendingAccount._id, status: strings.ACCOUNT_NOT_FOUND, message: strings.CREATE_ACCOUNT_MESSAGE })
                } else {
                    return next(utils.constructError(strings.LOGGING_ERROR))
                }

            }
        } catch (error) {
            console.log(error)
            return next(utils.constructError(strings.LOGGING_ERROR))
        }
    })

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const isRegister = await utils.isRegister(profile.id)
            if (!isRegister) {
                const pAccount = await accountModel.getByGithubId(profile.id)
                if (pAccount) {
                    const del = await accountModel.delete(pAccount._id)
                }
                const user = await accountModel.create({ name: profile.displayName, username: profile.username, github_id: profile.id, created_at: new Date() })
            }
        } catch (error) {
            console.error(error)
        }
        return done(null, profile);
    }
));
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use((err, req, res, next) => {
    if (err.stack) {
        console.error(err.stack);
    }

    if (!err.custom) {
        err.message = "ERROR INTERNAL SERVER"
    }
    res.status(err.status || 500).json({
        error: {
            message: err.message,
        }
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on('SIGINT', async () => {
    await db.close();
    process.exit(0);
});

async function home(req, res, next) {
    if (req._id) {
        const user = await userModel.getUserById(req._id)
        res.status(200).json({ sharedId: user.username })
    } else {
        return next(utils.constructError(strings.UNAUTHORIZED))
    }
}


