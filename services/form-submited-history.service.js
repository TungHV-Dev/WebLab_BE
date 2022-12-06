const formRepo = require('../repositories/form-submited-history.repo')
const emailService = require('../utils/email-sender')

const submitContactUsForm = async function (data) {
    try {
        // Save form submited history to firebase
        await formRepo.insertForm(data)

        // Send message from form submited to destination email
        let template =
            `<p>You have got a new message from a client with the following content:</p>
            <ul><li>Name: ${data.name}</li><li>Email: ${data.email}</li>`

        if (data.phone_number) {
            template += `<li>Phone number: ${data.phone_number}</li>`
        }

        if (data.company) {
            template += `<li>Company: ${data.company}</li>`
        }

        template += `<li>Message: ${data.message}</li></ul>`

        let sendEmailResult = await emailService.sendEmail({
            from: _config.EMAIL_SERVICE.ADMIN_EMAIL_ADDRESS,
            to: _config.EMAIL_SERVICE.DESTINATION_EMAIL,
            subject: 'MESSAGE RECEIVED FROM RF3I WEB',
            html: template
        })

        return sendEmailResult
    } catch (e) {
        throw e
    }
}

module.exports = {
    submitContactUsForm
}