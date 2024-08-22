import { useState } from "react";
import "./App.css";
import axios from "axios";
import InvoiceDisplay from "./InvoiceDisplay";

function OcrServicePage() {
  const [invoice, setInvoice] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setInvoice(event.target.files[0]);
  };

  const handleClear = () => {
    setData(null);
    setInvoice(null);
    document.querySelector('input[type="file"]').value = ""; // Clear the file input
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (data) {
      handleClear();
      return;
    }

    if (!invoice) return;

    const formData = new FormData();
    formData.append("pdf", invoice);

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setData(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-2">
      <h1 className="text-3xl font-bold mb-4">Invoice Processor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="mr-4"
          disabled={data !== null} // Disable file input when data is present
        />
        <button
          type="submit"
          className="bg-sky-500 hover:bg-cyan-600 w-fit h-fit py-1 px-2 rounded"
        >
          <p className="font-medium text-white">
            {loading
              ? "Processing..."
              : data
              ? "Clear"
              : "Extract"}
          </p>
        </button>
      </form>

      {data && (
        <div className="mt-4">
          <InvoiceDisplay invoice={data} />
        </div>
      )}
    </div>
  );
}


export default OcrServicePage;
