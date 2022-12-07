const constant = require('../utils/constant')
const moment = require('moment')

const insertForm = async (data) => {
    try {
        let key = _database.ref(constant.FIREBASE_DATABASE_NODE.FORM_SUBMITED_HISTORY).push().key
        let insertObj = {
            company: data.company ? data.company : null,
            email: data.email ? data.email : null,
            is_deleted: 0,
            message: data.message ? data.message : null,
            name: data.name ? data.name : null,
            phone_number: data.phone_number ? data.phone_number : null,
            submited_time: moment().format(constant.DATE_FORMAT.YYYY_MM_DD_HH_mm_ss_SSS)
        }

        await _database.ref(constant.FIREBASE_DATABASE_NODE.FORM_SUBMITED_HISTORY + '/' + key).set(insertObj)
    } catch (e) {
        console.log('Exception while insert form: ', e?.message)
    }
}

module.exports = {
    insertForm
}