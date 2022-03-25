const { createInvoice } = require("./createInvoice.js");

const invoice = {
  user: "Nikola Mandic",
  companyName: ['', ''],
  currency: "USD",
  shipping: {
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postal_code: ''
  },
  items: [
    {
      item: "Salary for",
      quantity: 1,
      amount: 2
    },
    {
      item: "a",
      quantity: 1,
      amount: 3
    }
  ],
  paid: 0,
  bankInfo: {
    intermediary: [
      '56A: Intermediary:',
      'BANK ',
      'SWIFT CODE:'
    ],
    institutionAccount: [
      '57A: Account with institution:',
      '.',
      'SWIFT CODE: '
    ],
    customer: [
      '59: Beneficiary Customer:',
      '',
      '',
      '',
      '',
      ''
    ]
  }
};

const invoiceName = () => {
  const dateNow = new Date();
  const dateFormat = dateNow.getFullYear() + '-' + dateNow.getDate() + '-' + dateNow.getDay();
  const nameFormat = dateFormat + ' - ' + invoice.user + ' Invoice';
  return `${nameFormat} #${dateNow.getFullYear().toString().slice(-2)}${dateNow.getMonth().toString().padStart(2, '0')}.pdf`
}
createInvoice(invoice, invoiceName());