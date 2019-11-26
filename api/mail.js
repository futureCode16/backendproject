const fs = require('fs');
let response = null;
let successResponse = require("./setSuccessResponse");
var template = fs.readFileSync('./template.html');
template = template.toString();

module.exports = (data, res) => {
    template = template.replace("_CLAIMCODE_", data.code)

    const sendMail = (to, content) => {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(apiKey);
        const msg = {
            to: to,
            from: 'XpressDocX@protonmail.com',
            subject: 'XpressDocX Claim Code!',
            text: 'test',
            html: content
        };
        if (sgMail.send(msg)) {
            console.log('sent');
        } else {
            console.log('error')
        };
    };
    sendMail(data.email, template);
    response = successResponse(201, { "success": true}, "Code has been sent to your email!")
    res.send(response);
    // sendMail(data.email, template);
    // sendMail('chervin.tanilon@student.passerellesnumeriques.org', template);
    // sendMail('lalaine.garrido@student.passerellesnumeriques.org', template);
}