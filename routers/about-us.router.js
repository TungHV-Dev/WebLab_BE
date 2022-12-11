const express = require('express')
const router = express.Router()
const aboutUsService = require('../services/about-us.service')
const constant = require('../utils/constant')

router.get('/active-member', async (req, res) => {
    try {
        let result = await aboutUsService.getActiveMember(req.query)
        return res.status(constant.HTTP_STATUS_CODE.OK).json({
            code: constant.RESPONSE_CODE.SUCCESS, 
            message: constant.RESPONSE_MESSAGE.SUCCESS, 
            data: result
        })
    } catch (e) {
        return res.status(e.status || constant.HTTP_STATUS_CODE.INTERNAL_SERVER).json({
            code: constant.RESPONSE_CODE.FAIL,
            message: e?.message
        })
    }
})

module.exports = router