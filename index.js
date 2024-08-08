const { PDFDocument } = require('pdf-lib');
const fs = require('fs');

async function extractTextFromPDF(pdfFilePath) {
  try {
    // Read the PDF file
    const pdfBytes = fs.readFileSync(pdfFilePath);

    // Load the PDF
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Extract text from each page
    const text = [];
    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
      const page = pdfDoc.getPage(i);
      const content = await page.getTextContent();
      text.push(content.items.map(item => item.str).join(' '));
    }

    // Join text from all pages into a single string
    return text.join('\n');
  } catch (error) {
    console.error('Error extracting text:', error);
    return null;
  }
}

// Usage example
const pdfFilePath = 'path/to/your/pdf/file.pdf';
extractTextFromPDF(pdfFilePath)
  .then(text => {
    console.log('Extracted text:', text);
  })
  .catch(error => {
    console.error('Error:', error);
  });
