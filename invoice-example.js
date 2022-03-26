
const invoice = {
  user: "Nikola Mandic",
  companyName: ['company name', 'second row of company name if it needs one'],
  currency: "USD",
  billTo: {
    name: "Vivant Inc.",
    address: "548 Market Street #66520",
    city: "San Francisco",
    state: "California",
    country: "United States",
    postal_code: '94104-5401'
  },
  items: [
    {
      item: "Salary for",
      appendMonthName: true, // appends month name to the end of the item name
      quantity: 1,
      amount: 1000
    },
    {
      item: "Administrative costs",
      quantity: 1,
      amount: 280
    }
  ],
  paid: 0,
  bankInfo: {
    intermediary: [
      '56A: Intermediary:',
      '<some intermediary bank>',
      'SWIFT CODE: <some swift code>'
    ],
    institutionAccount: [
      '57A: Account with institution:',
      '<company bank>',
      'SWIFT CODE: <some swift code>'
    ],
    customer: [
      '59: Beneficiary Customer:',
      '<account number',
      'company name',
      'company address',
      'company city',
      'company country'
    ]
  }
};

module.exports = { invoice };