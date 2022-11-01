const initializeApp = require('firebase').app
const getAnalytics = require('firebase').analytics

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

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)