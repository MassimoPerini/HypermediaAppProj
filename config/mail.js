/**
  This utility file includes the function to send an email server-side.
  It includes the configuration of a sample gmail account (existent and working).
  This module uses the nodemailer library
 * @module email
 */

var nodemailer = require('nodemailer');
var debug = require('debug')('email');

'use strict';
module.exports = {

  /**
     * @param {string} recipient - The recipient of the email
     * @param {string} subject - The subject of the email
     * @param {string} body - The text of the email
     * @return {undefined}
     *
     * @function
  */
  sendEmail : function(recipient, subject, body){
    var sendTo = recipient;
    var from = '"CPM Clinic 👻" <polimihyp201710481736@gmail.com>';
    var subject = (subject) ? subject : '你好';

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: 'polimihyp201710481736@gmail.com',
            pass: 'cpmclinic'
        }
    });
    let mailOptions = {
        from: from, // sender address
        to: sendTo, // list of receivers
        subject: subject, // Subject line
        html: body // plain text body
    };
    // Send the defined email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return debug(error);
        }else{
          return debug('Message %s sent: %s', info.messageId, info.response)
        }
    });

  }

}
