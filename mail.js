"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config();

// async..await is not allowed in global scope, must use a wrapper
async function send(pdf, path, customMessage = '') {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SEND_FROM_EMAIL,
      pass: process.env.SEND_FROM_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const monthName = new Date().toLocaleString('en-us', { month: 'long' });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"Invoice-custom" <nmtechagency@gmail.com>`, // sender address
    to: process.env.SEND_TO, // list of receivers
    subject: `Invoice for ${monthName} ✔`, // Subject line
    text: `Invoice for ${monthName}`, // plain text body
    html: customMessage, // html body
    attachments: [
      {
          filename: pdf,
          path: path,
          contentType: 'application/pdf'
      }]

  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = {
  send
};

// send('2022-25-5 - Nikola Mandic Invoice #2202.pdf').catch(console.error);