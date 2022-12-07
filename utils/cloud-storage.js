const constant = require('./constant')

const getObjectUrl = async (fileName, type) => {
    try {
        let objectRef
        let storageTypeKeys = Object.keys(constant.FIREBASE_STORAGE_TYPE)
        
        for (let key of storageTypeKeys) {
            if (type === constant.FIREBASE_STORAGE_TYPE[key]) {
                objectRef = _storage.ref(constant.FIREBASE_STORAGE_TYPE[key]).child(fileName)
                break
            }
        }

        let objectUrl = ''
        if (objectRef) {
            await objectRef.getDownloadURL().then(url => {
                if (url) {
                    objectUrl = url
                }
            }).catch(error => {
                switch (error.code) {
                    case 'storage/object-not-found':
                        console.log(`File doesn't exist`)
                        break
                    case 'storage/unauthorized':
                        console.log(`User doesn't have permission to access the object`)
                        break
                    case 'storage/canceled':
                        console.log(`User canceled the upload`)
                        break
                    case 'storage/unknown':
                        console.log(`Unknown error occurred, inspect the server response`)
                        break
                }
            })
        }

        return objectUrl
    } catch (e) {
        console.log('Error while get image url: ', e?.message)
    }
}

module.exports = {
    getObjectUrl
}