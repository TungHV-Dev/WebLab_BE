const express = require('express')
const router = express.Router()

router.get('/test', async (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'Success',
        data: 'test home router'
    })
})

module.exports = router