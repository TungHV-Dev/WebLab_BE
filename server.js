const express = require('express')
const app = express()
const test = require('./test')

global._config = require('./utils/config')

const port = _config.SERVER.PORT

app.use(express.json())

app.get('/exams', (req, res) => {
    test.generate_new_exams(req, res)
})

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})