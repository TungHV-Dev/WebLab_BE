const express = require('express')
const router = express.Router()
const homeService = require('../services/home-page.service')
const constant = require('../utils/constant')

router.get('/news/main', async (req, res) => {
    try {
        let result = await homeService.getMainNewsForHomePage(req.query)
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

router.get('/news/all', async (req, res) => {
    try {
        let result = await homeService.getAllNews(req.query)
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

router.get('/news/detail', async (req, res) => {
    try {
        let result = await homeService.getNewsDetail(req.query)
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

router.post('/news/add', async (req, res) => {
    try {
        await homeService.addNews(req.body)
        return res.status(constant.HTTP_STATUS_CODE.OK).json({ 
            code: constant.RESPONSE_CODE.SUCCESS, 
            message: constant.RESPONSE_MESSAGE.SUCCESS
        })
    } catch (e) {
        return res.status(e.status || constant.HTTP_STATUS_CODE.INTERNAL_SERVER).json({
            code: constant.RESPONSE_CODE.FAIL,
            message: e?.message
        })
    }
})

router.get('/events/main', async (req, res) => {
    try {
        let result = await homeService.getMainEvents(req.query)
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

router.get('/events/all', async (req, res) => {
    try {

    } catch (e) {
        return res.status(e.status || constant.HTTP_STATUS_CODE.INTERNAL_SERVER).json({
            code: constant.RESPONSE_CODE.FAIL,
            message: e?.message
        })
    }
})

router.get('/events/detail', async (req, res) => {
    try {

    } catch (e) {
        return res.status(e.status || constant.HTTP_STATUS_CODE.INTERNAL_SERVER).json({
            code: constant.RESPONSE_CODE.FAIL,
            message: e?.message
        })
    }
})

module.exports = router