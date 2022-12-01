const NODE_ENV = process.env.NODE_ENV || 'dev'
const express = require('express')
const cors = require('cors')
const session = require('express-session')

global._config = require(`./configs/${NODE_ENV}`)

const firebaseConnection = require('./connections/firebase')
global._database = firebaseConnection.createDatabase()

const bodyParser = require('body-parser')
const port = NODE_ENV == 'uat' ? process.env.PORT : _config.SERVER.PORT
const app = express()

const homeApi = require('./routers/home.router')
const aboutUsApi = require('./routers/about-us.router')
const publicationApi = require('./routers/publication.router')
const productApi = require('./routers/product.router')
const contactUsApi = require('./routers/contact-us.router')

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

app.get('/', (req, res) => {
    res.status(200).json({ code: 200, message: `Service is running on port ${port}` })
})

app.use('/rf3i-api/home', homeApi)
app.use('/rf3i-api/about-us', aboutUsApi)
app.use('/rf3i-api/publication', publicationApi)
app.use('/rf3i-api/product', productApi)
app.use('/rf3i-api/contact-us', contactUsApi)

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})