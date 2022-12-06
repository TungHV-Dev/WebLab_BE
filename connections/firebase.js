const firebase = require('firebase')
require('firebase/storage')

const firebaseConfig = {
    apiKey: _config.FIREBASE.API_KEY,
    authDomain: _config.FIREBASE.AUTH_DOMAIN,
    databaseURL: _config.FIREBASE.DATABASE_URL,
    projectId: _config.FIREBASE.PROJECT_ID,
    storageBucket: _config.FIREBASE.STORAGE_BUCKET,
    messagingSenderId: _config.FIREBASE.MESSAGING_SENDER_ID,
    appId: _config.FIREBASE.APP_ID,
    measurementId: _config.FIREBASE.MEASUREMENT_ID
}

firebase.initializeApp(firebaseConfig)

const createDatabase = () => {
    return firebase.database()
}

const createStorage = () => {
    return firebase.storage()
}

module.exports = {
    createDatabase,
    createStorage
}