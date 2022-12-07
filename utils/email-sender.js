const nodemailer = require('nodemailer')
const OAuth2Client = require('google-auth-library').OAuth2Client

const myOAuth2Client = new OAuth2Client(
    _config.EMAIL_SERVICE.GOOGLE_MAILER_CLIENT_ID,
    _config.EMAIL_SERVICE.GOOGLE_MAILER_CLIENT_SECRET
)

myOAuth2Client.setCredentials({
    refresh_token: _config.EMAIL_SERVICE.GOOGLE_MAILER_REFRESH_TOKEN
})

const sendEmail = async function (options) {
    let myAccessTokenObject = await myOAuth2Client.getAccessToken()
    let myAccessToken = myAccessTokenObject?.token

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: _config.EMAIL_SERVICE.ADMIN_EMAIL_ADDRESS,
            clientId: _config.EMAIL_SERVICE.GOOGLE_MAILER_CLIENT_ID,
            clientSecret: _config.EMAIL_SERVICE.GOOGLE_MAILER_CLIENT_SECRET,
            refresh_token: _config.EMAIL_SERVICE.GOOGLE_MAILER_REFRESH_TOKEN,
            accessToken: myAccessToken
        }
    })

    let mailOptions = {
        from: options.from,
        to: options.to,
        subject: options.subject,
        html: options.html
    }

    let returnCode = -1

    await transporter.sendMail(mailOptions).then(async info => {
        returnCode = 0
    }).catch(err => {
        console.log('Error while sent mail: ', err.response)
    })

    return returnCode
}

module.exports = {
    sendEmail
}