const constant = require('../utils/constant')

const getLimitOfLastEvents = async (limit) => {
    try {
        let result = {}
        await _database.ref(constant.FIREBASE_NODE.EVENTS).limitToLast(limit).once('value', (snapshot) => {
            if (snapshot) {
                result = snapshot.val()
            }
        })

        let responses = []
        Object.keys(result).map(key => {
            let responseObj = { id: key, ...result[key] }
            responses.push(responseObj)
        })

        return responses.reverse()
    } catch (e) {
        console.log('Exception while get limit events: ', e?.message)
    }
}

module.exports = {
    getLimitOfLastEvents
}