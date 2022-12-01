const constant = require('../utils/constant')
const moment = require('moment')
const newsRepo = require('../repositories/news.repo')

const getMainNewsForHomePage = async function (data) {
    try {
        let limitRecord = Number(data.limit || constant.NUMBER_OF_MAIN_NEWS_RECORDS)
        let mainNews = await newsRepo.getLimitOfLastNews(limitRecord)

        let result = await Promise.all(mainNews.map(news => {
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

const getNewsDetail = async function (data) {
    try {
        let newsId = data.news_id
        return await newsRepo.getNewsById(newsId)
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

module.exports = {
    getMainNewsForHomePage,
    getNewsDetail,
    addNews
}