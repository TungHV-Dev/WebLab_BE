const express = require('express')
const app = express()

global._config = require('./utils/config')

console.log(_config.SERVER.HOST)