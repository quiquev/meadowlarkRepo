var nodemailer = require('nodemailer');

module.exports = function(credentials){
    var mailTransport = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
        user: credentials.gmail.user,
        password: credentials.gmail.password
      }
    });

    return {
        send: function (){
            mailTransport.sendMail({
                from: '"Your Daddy" <yourdaddy@test.com>',
                to: 'oscar.i.blancas@gmail.com',
                subject: 'Daddy\'s Test',
                text: 'Klk.'
            }, function(err){
                if(err)
                    console.error('Unable to send email: ' + error);
            });
        }
    }
}
