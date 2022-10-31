const nodemailer = require('nodemailer')

const createTransport = async function() {
    let transPorter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        port: '465',
        secure: false,
        auth: {
            type: 'login',
            user: _config.EMAIL_SERVICE.USER,
            pass: _config.EMAIL_SERVICE.PASSWORD
        }
    })
    return transPorter
}

const sendEmail = async function(data) {
    let transporter = await createTransport()
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
        from: _config.EMAIL_SERVICE.USER,
        to: _config.EMAIL_SERVICE.DESTINATION_EMAIL,
        subject: 'Test Nodemailer',
        html: template,
        text: ''
    }

    let message
    await transporter.sendMail(mailOptions).then(info => {
        message = info
    }).catch(err => {
        console.log('Error while sent mail: ', err.response)
        message = err.response
    }) 

    return message
}

module.exports = {
    sendEmail
}