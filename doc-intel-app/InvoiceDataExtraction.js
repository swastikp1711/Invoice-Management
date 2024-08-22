const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
const fs = require('fs');
const path = require('path');
require('dotenv').config();

//use your `key` and `endpoint` environment variables
const endpoint = process.env.AZURE_ENDPOINT;
const key = process.env.AZURE_API_KEY;

const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

async function processInvoice(invoiceFilePath) {

  const invoiceFile = fs.readFileSync(invoiceFilePath);

  const poller = await client.beginAnalyzeDocument("prebuilt-invoice", invoiceFile, {
    contentType: "application/pdf",
    });

  const {
      documents: [result]
  } = await poller.pollUntilDone();


  var data = {};

  if (result) {
      const invoice = result.fields;

console.log(invoice);
      data = {
        documentNumber:invoice.InvoiceId?.content,
        documentDate:invoice.InvoiceDate?.content,
        vendorName:invoice.VendorName?.content,
        customerName:invoice.CustomerName?.content,
        billingAddress:invoice.BillingAddressRecipient?.content+"\n"+invoice.BillingAddress?.content,
      }
      var items = [];

      for (const {
              properties: product
          } of invoice.Items?.values ?? []) {

          const item = {
            itemCode:product.ProductCode?.content,
            description:product.Description?.content,
            quantity: product.Quantity?.content,
            unit: product.Unit?.content,
            unitPrice: product.UnitPrice?.content,
            amount: product.Amount?.content
          }

          items.push(item);
      }

      data.items=items;
      data.subtotal=invoice.SubTotal?.content;
      data.tax=invoice.TotalTax?.content;
      data.totalAmount=invoice.InvoiceTotal?.content;
      data.dueDate=invoice.DueDate?.content;
      
  } else {
      throw new Error("Expected at least one receipt in the result.");
  }

  return data;
}

module.exports = { processInvoice };