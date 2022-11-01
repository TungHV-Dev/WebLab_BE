const nodemailer = require('nodemailer')
const OAuth2Client = require('google-auth-library').OAuth2Client

const myOAuth2Client = new OAuth2Client(
    _config.EMAIL_SERVICE.GOOGLE_MAILER_CLIENT_ID,
    _config.EMAIL_SERVICE.GOOGLE_MAILER_CLIENT_SECRET
)

myOAuth2Client.setCredentials({
    refresh_token: _config.EMAIL_SERVICE.GOOGLE_MAILER_REFRESH_TOKEN
})

const sendEmail = async function (data) {
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

    let template =
        `<p>You have got a new message from a client with the following content:</p>
        <ul>
            <li>Name: ${data.name}</li>
            <li>Email: ${data.email}</li>
            <li>Phone number: ${data.phone_number}</li>
            <li>Company: ${data.company}</li>
            <li>Message: ${data.message}</li>
        </ul>`

    let mailOptions = {
        from: _config.EMAIL_SERVICE.ADMIN_EMAIL_ADDRESS,
        to: _config.EMAIL_SERVICE.DESTINATION_EMAIL,
        subject: 'MESSAGE RECEIVED FROM RF3I WEB',
        html: template
    }

    let message
    let code
    await transporter.sendMail(mailOptions).then(info => {
        message = 'Email was sent successful'
        code = 200
    }).catch(err => {
        console.log('Error while sent mail: ', err.response)
        message = err.response
        code = 400
    })

    return { message, code }
}

module.exports = {
    sendEmail
}