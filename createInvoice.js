const fs = require("fs");
const PDFDocument = require("pdfkit");

const currentDate = new Date();

let subtotal = 0;
let total = 0;
let currency;

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  subtotal = invoice.items.reduce((summ, item) => summ + (item.amount * item.quantity), 0);
  total = subtotal - invoice.paid;
  currency = invoice.currency;

  generateHeader(doc, invoice);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateBankInfo(doc, invoice);
  // generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function companyName(nameArr) {
  let name = '';
  nameArr.forEach((el, index) => {
    name = name + '\n' + el;
  });
  name = name.trim();
  return name;
}

function generateHeader(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(12)
    .text(companyName(invoice.companyName), 50, 57)
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  const customerInfoTop = 140
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, customerInfoTop)
    .fontSize(16)
    .font("Helvetica-Bold")
    .text(formatNo(currentDate), 150, customerInfoTop + 3)
    .font("Helvetica")
    .fontSize(12)
    .text("Bill to:", 300, customerInfoTop + 5);

  generateHr(doc, customerInfoTop + 25);

  const customerInformationTop = customerInfoTop + 40;

  doc
    .fontSize(10)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(currentDate), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(total),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
      ", " +
      invoice.shipping.state +
      " " +
      invoice.shipping.postal_code,
      300,
      customerInformationTop + 30
    )
    .text(invoice.shipping.country, 300, customerInformationTop + 45)
    .moveDown();

  generateHr(doc, customerInformationTop + 62);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 310;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "",
    "Rate",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const itemName = item.item.startsWith('Salary for') ? item.item + ' ' + currentDate.toLocaleString('en-us', { month: 'long' }) : item.item;
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      itemName,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 35;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "",
    "Total:",
    formatCurrency(total)
  );
}

function generateBankInfo(doc, invoice) {
  const bankInfoTop = 470;
  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text('PAYMENT INSTRUCTIONS:', 50, bankInfoTop)
  generateHr(doc, bankInfoTop + 20)

  const intermediaryTop = bankInfoTop + 35;
  invoice.bankInfo.intermediary.forEach((info, index) => {
    writeBankInfo(doc, info, index, intermediaryTop);
  });
  const institutionAccountTop = invoice.bankInfo.intermediary.length * 15 + intermediaryTop + 15;
  invoice.bankInfo.institutionAccount.forEach((info, index) => {
    writeBankInfo(doc, info, index, institutionAccountTop);
  });
  const customerAccountTop = invoice.bankInfo.institutionAccount.length * 15 + institutionAccountTop + 15;
  invoice.bankInfo.customer.forEach((info, index) => {
    writeBankInfo(doc, info, index, customerAccountTop);
  });
}
function writeBankInfo(doc, info, index, top) {
  const fromTop = top + index * 15;
  doc.fontSize(10)
    .text(info, 50, fromTop)

}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Payment is due within 15 days. Thank you for your business.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  // return "$" + (cents / 100).toFixed(2);// Create our number formatter.
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return formatter.format(cents);
}

function formatNo(date) {
  let month = date.getMonth().toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  return `#${year}${month}`
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.toLocaleString('en-us', { month: 'short' });
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

module.exports = {
  createInvoice
};