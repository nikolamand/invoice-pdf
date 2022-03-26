const { createInvoice } = require("./createInvoice.js");
const { invoice } = require("./invoice.js");
const { send } = require('./mail');

const dateNow = new Date();
const invoiceDir = './invoices/'
const checkDir = dir => {
  const fs = require('fs');

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
}
const name = () => {
  const dateFormat = dateNow.getFullYear() + '-' + dateNow.getDate() + '-' + dateNow.getDay();
  const nameFormat = dateFormat + ' - ' + invoice.user;
  return nameFormat;
}
const invoiceName = () => {
  return `${name()} - Invoice #${dateNow.getFullYear().toString().slice(-2)}${dateNow.getMonth().toString().padStart(2, '0')}.pdf`
}
const mailMessage = () => {
  return `${name()} - admin costs`
}
checkDir(invoiceDir);
createInvoice(invoice, invoiceDir + invoiceName());
send(invoiceName(), invoiceDir + invoiceName(), mailMessage());