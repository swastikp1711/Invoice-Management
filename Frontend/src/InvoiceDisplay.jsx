import React from "react";

function InvoiceDisplay({ invoice }) {
  return (
    <div>
      <h2 className="text-2xl font-bold ">Invoice Details</h2>
      <div className="ml-2">
        <p>
          <strong>Document Number:</strong> {invoice.documentNumber || "N/A"}
        </p>
        <p>
          <strong>Document Date:</strong> {invoice.documentDate || "N/A"}
        </p>
        <p>
          <strong>Vendor Name:</strong> {invoice.vendorName || "N/A"}
        </p>
        <p>
          <strong>Customer Name:</strong> {invoice.customerName || "N/A"}
        </p>
        <p>
          <strong>Billing Address:</strong>
        </p>
        <pre>{invoice.billingAddress || "N/A"}</pre>

        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Item Code</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items && invoice.items.length > 0 ? (
              invoice.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemCode || "N/A"}</td>
                  <td>{item.description || "N/A"}</td>
                  <td>{item.quantity || "N/A"}</td>
                  <td>{item.unit || "N/A"}</td>
                  <td>{item.unitPrice || "N/A"}</td>
                  <td>{item.amount || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No items available</td>
              </tr>
            )}
          </tbody>
        </table>

        <h3>Summary</h3>
        <p>
          <strong>Subtotal:</strong> {invoice.subtotal || "N/A"}
        </p>
        <p>
          <strong>Tax:</strong> {invoice.tax || "N/A"}
        </p>
        <p>
          <strong>Total Amount:</strong> {invoice.totalAmount || "N/A"}
        </p>
        <p>
          <strong>Due Date:</strong> {invoice.dueDate || "N/A"}
        </p>
      </div>
    </div>
  );
}

export default InvoiceDisplay;
