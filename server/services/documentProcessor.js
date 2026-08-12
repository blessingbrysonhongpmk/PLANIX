/**
 * PLANIX MULTI-FORMAT DOCUMENT PROCESSING PIPELINE
 * Extracts text from PDF, DOCX, TXT, PNG, JPG, JPEG.
 * Distinguishes TEXT PDF from SCANNED PDF using Tesseract OCR fallback.
 */

const fs = require('fs');
const path = require('path');

let pdfParse = null;
let mammoth = null;
let Tesseract = null;

try { pdfParse = require('pdf-parse'); } catch (e) { console.warn('pdf-parse loading lazy...'); }
try { mammoth = require('mammoth'); } catch (e) { console.warn('mammoth loading lazy...'); }
try { Tesseract = require('tesseract.js'); } catch (e) { console.warn('tesseract.js loading lazy...'); }

class DocumentProcessor {
  /**
   * Processes a document file path and returns extracted text and metadata.
   */
  async extractTextFromFile(filePath, mimeType, originalName) {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at path: ${filePath}`);
    }

    const ext = path.extname(originalName || filePath).toLowerCase();
    let text = '';
    let isScanned = false;
    let pageCount = 1;
    let extractionMethod = 'native';

    if (ext === '.pdf' || mimeType === 'application/pdf') {
      try {
        if (!pdfParse) pdfParse = require('pdf-parse');
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        text = (pdfData.text || '').trim();
        pageCount = pdfData.numpages || 1;

        // If extracted text is less than 50 characters, flag as scanned and run OCR fallback
        if (text.length < 50) {
          isScanned = true;
          extractionMethod = 'tesseract-ocr';
          text = await this.runOcrOnImage(filePath);
        } else {
          extractionMethod = 'pdf-parse';
        }
      } catch (err) {
        console.warn('PDF text extraction error, attempting OCR:', err.message);
        isScanned = true;
        extractionMethod = 'tesseract-ocr-fallback';
        text = await this.runOcrOnImage(filePath);
      }
    } else if (ext === '.docx' || mimeType.includes('wordprocessingml')) {
      try {
        if (!mammoth) mammoth = require('mammoth');
        const result = await mammoth.extractRawText({ path: filePath });
        text = (result.value || '').trim();
        extractionMethod = 'mammoth-docx';
      } catch (err) {
        throw new Error(`Failed to extract DOCX text: ${err.message}`);
      }
    } else if (['.png', '.jpg', '.jpeg', '.webp', '.bmp'].includes(ext) || mimeType.startsWith('image/')) {
      isScanned = true;
      extractionMethod = 'tesseract-ocr';
      text = await this.runOcrOnImage(filePath);
    } else if (ext === '.txt' || mimeType === 'text/plain') {
      text = fs.readFileSync(filePath, 'utf8').trim();
      extractionMethod = 'plaintext';
    } else {
      // Fallback plain text try
      try {
        text = fs.readFileSync(filePath, 'utf8').trim();
        extractionMethod = 'fallback-utf8';
      } catch {
        throw new Error(`Unsupported document format: ${ext}`);
      }
    }

    const confidence = text.length > 100 ? 0.95 : text.length > 20 ? 0.75 : 0.40;

    return {
      text,
      isScanned,
      pageCount,
      extractionMethod,
      confidence,
      charCount: text.length
    };
  }

  /**
   * Runs Tesseract.js OCR engine on an image file.
   */
  async runOcrOnImage(filePath) {
    try {
      if (!Tesseract) Tesseract = require('tesseract.js');
      const worker = await Tesseract.createWorker('eng');
      const ret = await worker.recognize(filePath);
      const text = ret.data.text || '';
      await worker.terminate();
      return text.trim();
    } catch (ocrErr) {
      console.error('Tesseract OCR execution error:', ocrErr.message);
      return 'Scanned document text could not be read cleanly. Please ensure high image contrast.';
    }
  }
}

module.exports = new DocumentProcessor();
