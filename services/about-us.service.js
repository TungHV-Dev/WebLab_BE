const constant = require('../utils/constant')
const storageService = require('../utils/cloud-storage')
const memberRepo = require('../repositories/member.repo')

const getActiveMember = async function (data) {
    try {
        let limit = data.size
        let offset = data.size * (data.page - 1)

        let memberInfos = await memberRepo.getActiveMemberPaging(limit, offset)
        let result = []

        for (let infor of memberInfos) {
            let memberObj = {
                id: infor.id,
                full_name: infor.full_name,
                course_number: infor.course_number,
                class: infor.class,
                avatar_url: await storageService.getObjectUrl(infor.avatar_file_name, constant.FIREBASE_STORAGE_FOLDER.IMAGES),
                type: infor.type
            }
            result.push(memberObj)
        }

        return result
    } catch (e) {
        throw e
    }
}

module.exports = {
    getActiveMember
}