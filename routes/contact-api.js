/**
 * Created by massimo on 28/06/17.
 */

var debug = require('debug')('content');

var express = require('express');
var models = require('../models');

var router = express.Router();
router.get('/api/contact', function(req, res, next){

    //cpmclinic
    //polimihyp201710481736@gmail.com

    var sendTo = "perinimassimo1995@gmail.com";
    var from = '"CPM Clinic 👻" <polimihyp201710481736@gmail.com>';
    var subject = '你好';
    var text = "Mail di test";

    'use strict';
    const nodemailer = require('nodemailer');

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
        text: text, // plain text body
     //   html: '<b>Test HTML</b>' // html body
    };

// send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

});

module.exports = router;
