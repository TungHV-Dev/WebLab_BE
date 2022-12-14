const constant = require('../utils/constant')
const moment = require('moment')
const newsRepo = require('../repositories/news.repo')
const eventsRepo = require('../repositories/events.repo')

const getMainNewsForHomePage = async function (data) {
    try {
        let limitRecord = Number(data.limit || constant.NUMBER_OF_MAIN_NEWS_RECORDS)
        let mainNews = await newsRepo.getLimitOfLastNews(limitRecord)

        let result = []
        for (let news of mainNews) {
            let newsObj = {
                id: news.id,
                title: news.title,
                sub_title: news.sub_title,
                image_title_url: news.image_title_url,
                created_time: moment(news.created_time).format(constant.DATE_FORMAT.YYYY_MM_DD_HH_mm_ss)
            }
            result.push(newsObj)
        }

        return result || []
    } catch (e) {
        throw e
    }
}

const getNewsDetail = async function (data) {
    try {
        let newsId = data.news_id
        return await newsRepo.getNewsById(newsId)
    } catch (e) {
        throw e
    }
}

const getAllNews = async function (data) {
    try {
        let limit = data.size
        let offset = data.size * (data.page - 1)

        let allNewsPaging = await newsRepo.getAllNewsPaging(limit, offset)
        let result = await Promise.all(allNewsPaging.map(news => {
            return {
                id: news.id,
                title: news.title,
                sub_title: news.sub_title,
                image_title_url: news.image_title_url,
                created_time: moment(news.created_time).format(constant.DATE_FORMAT.YYYY_MM_DD_HH_mm_ss)
            }
        }))

        return result || []
    } catch (e) {
        throw e
    }
}

const addNews = async function (data) {
    try {
        await newsRepo.insertNews(data)
    } catch (e) {
        throw e
    }
}

const getMainEvents = async function (data) {
    try {
        let limitRecord = Number(data.limit || constant.NUMBER_OF_MAIN_EVENTS_RECORDS)
        let mainEvents = await eventsRepo.getLimitOfLastEvents(limitRecord)

        let result = []
        for (let event of mainEvents) {
            let eventObj = {
                id: event.id,
                title: event.title,
                event_time: moment(event.event_time).format(constant.DATE_FORMAT.DD_MM_YYYY)
            }
            result.push(eventObj)
        }

        return result || []
    } catch (e) {
        throw e
    }
}

module.exports = {
    getMainNewsForHomePage,
    getNewsDetail,
    getAllNews,
    addNews,
    getMainEvents
}