const constant = require('../utils/constant')
const moment = require('moment')

const getActiveMemberPaging = async (limit, offset) => {
    try {
        let result = {}
        await _database.ref(constant.FIREBASE_DATABASE_NODE.MEMBER).orderByChild('status').equalTo(constant.MEMBER_STATUS.ACTIVE).once('value', (snapshot) => {
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
        console.log('Exception while get active member paging: ', e?.message)
    }
}

module.exports = {
    getActiveMemberPaging
}