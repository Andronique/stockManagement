import React, { useRef } from 'react';
import html2pdf from 'html2pdf.js';

const PDFComponent = () => {
  const pdfRef = useRef();

  const handleDownload = () => {
    html2pdf(pdfRef.current, {
      margin: 1,
      filename: 'document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    });
  };

  return (
    <div>
      {/* PDF-only header */}
      <div className="pdf-header">
        <h1>PDF Header (Visible in PDF Only)</h1>
      </div>

      <div ref={pdfRef}>
        <p>Your PDF content goes here.</p>
      </div>

      <button onClick={handleDownload}>Download PDF</button>

      <style jsx>{`
        /* Hide the header by default */
        .pdf-header {
          display: none;
         
        }
        
        /* Make the header visible in print view, which is used by html2pdf */
        @media print {
          .pdf-header {
            display: block;
            text-align: center;
            font-weight: bold;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default PDFComponent;
