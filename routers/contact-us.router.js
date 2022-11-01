const express = require('express')
const email = require('../utils/email')
const router = express.Router()

router.post('/submit-form', async (req, res) => {
    try {
        let result = await email.sendEmail(req.body)

        return res.status(200).json(result)
    } catch (e) {
        return res.status(e.status || 500).json({ code: 500, message: e?.message })
    }
})

module.exports = router