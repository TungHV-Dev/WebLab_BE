const express = require('express')
const router = express.Router()
const formSubmitService = require('../services/form-submited-history.service')

router.post('/submit-form', async (req, res) => {
    try {
        console.log('submit form body: ', req.body)
        let result = await formSubmitService.submitContactUsForm(req.body)

        if (result == -1) {
            return res.status(400).json({
                code: -1,
                message: 'Send message from form to email failed'
            })
        }

        return res.status(200).json({ code: 0, message: 'Success' })
    } catch (e) {
        return res.status(e.status || 500).json({ code: 500, message: e?.message })
    }
})

module.exports = router