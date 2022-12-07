module.exports = {
    RESPONSE_MESSAGE: {
        SUCCESS: 'Success',
        FAIL: 'Fail'
    },
    RESPONSE_CODE: {
        SUCCESS: 0,
        FAIL: -1
    },
    HTTP_STATUS_CODE: {
        OK: 200,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        NOT_FOUND: 404,
        INTERNAL_SERVER: 500
    },
    DATE_FORMAT: {
        yyyy_mm_dd_HH_mm_ss: 'yyyy-mm-dd HH:mm:ss',
        YYYY_MM_DD_HH_mm_ss: 'YYYY-MM-DD HH:mm:ss',
        YYYY_MM_DD_HH_mm_ss_SSS: 'YYYY-MM-DD HH:mm:ss.SSS',
        dd_mm_yyyy: 'dd-mm-yyyy',
        DD_MM_YYYY: 'DD-MM-YYYY',
        yyyy_mm_dd: 'yyyy-mm-dd',
        YYYY_MM_DD: 'YYYY-MM-DD',
        YYYYMMDDHHmmss: 'YYYYMMDDHHmmss'
    },
    FIREBASE_DATABASE_NODE: {
        EVENTS: 'events',
        FORM_SUBMITED_HISTORY: 'form_submited_history',
        NEWS: 'news'
    },
    FIREBASE_STORAGE_TYPE: {
        FILES: 'files',
        IMAGES: 'images',
        VIDEOS: 'videos'
    },
    NUMBER_OF_MAIN_NEWS_RECORDS: 3,
    NUMBER_OF_MAIN_EVENTS_RECORDS: 3,
    NUMBER_OF_MAIN_ACTIVITIES: 3
}