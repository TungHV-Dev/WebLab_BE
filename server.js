const NODE_ENV = process.env.NODE_ENV || 'dev'
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const bodyParser = require('body-parser')

global._config = require(`./configs/${NODE_ENV}`)

// const port = _config.SERVER.PORT
const port = NODE_ENV == 'uat' ? process.env.PORT : _config.SERVER.PORT
const app = express()

app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.json({ limit: _config.SIZE_FILE_LIMIT }))
app.use(bodyParser.urlencoded({ extended: true, limit: _config.SIZE_FILE_LIMIT }));

app.use(session({
    saveUninitialized: false,
    secret: _config.SESSION.SECRET,
    resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
}))

app.use(cors({
    origin: '*',
    methods: 'GET,POST,OPTIONS,PUT,PATCH,DELETE',
    optionsSuccessStatus: 200
}))

app.get('/test', (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'Success',
        data: 'test'
    })
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})