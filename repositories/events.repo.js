const constant = require('../utils/constant')

const getLimitOfLastEvents = async (limit) => {
    try {
        let result = {}
        await _database.ref(constant.FIREBASE_DATABASE_NODE.EVENTS).limitToLast(limit).once('value', (snapshot) => {
            if (snapshot.val()) {
                result = snapshot.val()
            }
        })

        let responses = await Promise.all(Object.keys(result).map(key => {
            let responseObj = { id: key, ...result[key] }
            return responseObj
        }))

        return responses.reverse()
    } catch (e) {
        console.log('Exception while get limit events: ', e?.message)
    }
}

const getAllEventsPaging = async (limit, offset) => {
    try {
        let result = {}
        await _database.ref(constant.FIREBASE_DATABASE_NODE.EVENTS).once('value', (snapshot) => {
            if (snapshot.val()) {
                result = snapshot.val()
            }
        })

        let response = await Promise.all(Object.keys(result).map(key => {
            let responseObj = { id: key, ...result[key] }
            return responseObj
        }))
        
        let start = offset
        let end = (offset + limit) < response.length ? (offset + limit) : response.length

        return response.reverse().slice(start, end)
    } catch (e) {
        console.log('Exception while get all events with paging: ', e?.message)
    }
}

const getEventByEventId = async (event_id) => {
    try {
        let result = {}
        await _database.ref(constant.FIREBASE_DATABASE_NODE.EVENTS + '/' + event_id).once('value', (snapshot) => {
            result = snapshot.val()
        })

        if (!result) {
            return null
        }

        return { event_id, ...result }
    } catch (e) {
        console.log('Exception while get event detail: ', e?.message)
    }
}

module.exports = {
    getLimitOfLastEvents,
    getAllEventsPaging,
    getEventByEventId
}