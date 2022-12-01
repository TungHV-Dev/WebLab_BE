const constant = require('../utils/constant')
const moment = require('moment')

const insertNews = async (data) => {
    try {
        let key = _database.ref(constant.FIREBASE_NODE.NEWS).push().key
        let insertObj = {
            title: data.title || null,
            sub_title: data.sub_title || null,
            image_title_url: data.image_title_url || null,
            html_content: data.html_content || null,
            is_deleted: 0,
            created_user: 'tunghv',
            created_time: moment().format(constant.DATE_FORMAT.YYYY_MM_DD_HH_mm_ss_SSS)
        }

        await _database.ref(constant.FIREBASE_NODE.NEWS + '/' + key).set(insertObj)
    } catch (e) {
        console.log('Exception while insert news: ', e?.message)
    }
}

const getLimitOfLastNews = async (limit) => {
    try {
        let result = {}
        await _database.ref(constant.FIREBASE_NODE.NEWS).limitToLast(limit).once('value', (snapshot) => {
            if (snapshot) {
                result = snapshot.val()
            }
        })

        let response = []
        Object.keys(result).map(key => {
            let responseObj = { id: key, ...result[key] }
            response.push(responseObj)
        })

        return response.reverse()
    } catch (e) {
        console.log('Exception while get limit news: ', e?.message)
    }
}

const getAllNewsPaging = async (limit, offset) => {
    try {
        let result = {}
        await _database.ref(constant.FIREBASE_NODE.NEWS).once('value', (snapshot) => {
            if (snapshot) {
                result = snapshot.val()
            }
        })

        let response = []
        Object.keys(result).map(key => {
            let responseObj = { id: key, ...result[key] }
            response.push(responseObj)
        })

        let start = offset
        let end = (offset + limit) < response.length ? (offset + limit) : response.length
        
        return response.reverse().slice(start, end)
    } catch (e) {
        console.log('Exception while get all news with paging: ', e?.message)
    }
}

const getNewsById = async (id) => {
    try {
        let result = {}
        await _database.ref(constant.FIREBASE_NODE.NEWS + '/' + id).once('value', (snapshot) => {
            if (snapshot) {
                result = snapshot.val()
            }
        })

        return { id, ...result }
    } catch (e) {
        console.log('Exception while get news detail: ', e?.message)
    }
}

module.exports = {
    insertNews,
    getLimitOfLastNews,
    getAllNewsPaging,
    getNewsById
}