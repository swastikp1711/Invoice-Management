const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const { processInvoice } = require('./InvoiceDataExtraction');


require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });


app.post('/upload', upload.single('pdf'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const result = await processInvoice(filePath);

        // Send the extracted data back to the client
        res.json(result);
        console.log('result', result); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process the Invoice' });
    } finally {
        // Clean up the uploaded file
        fs.unlink(req.file.path, () => {});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
