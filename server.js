const express = require('express')
const app = express()

global._config = require('./utils/config')

const port = _config.SERVER.PORT

app.use(express.json())

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})