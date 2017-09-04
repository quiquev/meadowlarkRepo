//var nodemailer = require('nodemailer');

module.exports = function(credentials){
/*
    var smtpConfig = {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: credentials.gmail.user,
            pass: credentials.gmail.password
        }
    };

    var mailTransport = nodemailer.createTransport(smtpConfig);
    mailTransport.verify(function (err, success){
        if (err){
            console.log("Failed login : ", err);
        }else{
            console.log("Ready to send messages!");
        }
    });
*/

    return {
        send: function (){
/*
            mailTransport.sendMail({
                from: '"Your Daddy" <yourdaddy@test.com>',
                to: 'oscar.i.blancas@gmail.com',
                subject: 'Daddy\'s Test',
                text: 'Klk.'
            }, function(err){
                if(err)
                    console.error('Unable to send email: ' + error);
            });
*/
        }
    }
}
