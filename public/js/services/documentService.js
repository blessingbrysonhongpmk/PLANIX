/**
 * PLANIX ACADEMIC DOCUMENT SERVICE
 * Interfaces with backend Express APIs for real file uploads, OCR processing,
 * and 1-Click Action Synthesis.
 */

class DocumentService {
  constructor() {
    this.allowedExtensions = ['pdf', 'docx', 'pptx', 'png', 'jpg', 'jpeg', 'txt'];
    this.maxSizeBytes = 50 * 1024 * 1024; // 50 MB
  }

  validateFile(file) {
    if (!file) return { valid: false, error: 'No file provided.' };

    if (file.size > this.maxSizeBytes) {
      return { valid: false, error: `File size exceeds 50 MB limit (${(file.size / (1024 * 1024)).toFixed(1)} MB).` };
    }

    const ext = file.name.split('.').pop().toLowerCase();
    if (!this.allowedExtensions.includes(ext)) {
      return { valid: false, error: `Unsupported format .${ext}. Supported: PDF, DOCX, PPTX, PNG, JPG, TXT.` };
    }

    return { valid: true, ext };
  }

  formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  async uploadFile(file, onProgress) {
    const val = this.validateFile(file);
    if (!val.valid) throw new Error(val.error);

    const formData = new FormData();
    formData.append('file', file);

    if (onProgress) onProgress(30);

    const res = await window.apiClient.post('/documents/upload', formData);

    if (onProgress) onProgress(100);

    if (!res.success) {
      throw new Error(res.error || 'File upload failed');
    }

    // Refresh store document library
    await window.store.fetchAll();
    return res.document;
  }

  async commitActions(docId) {
    const res = await window.apiClient.post(`/documents/${docId}/commit-actions`, {});
    if (!res.success) {
      throw new Error(res.error || 'Failed to commit actions');
    }

    await window.store.fetchAll();
    return res;
  }

  async deleteDocument(docId) {
    const res = await window.apiClient.delete(`/documents/${docId}`);
    if (!res.success) throw new Error(res.error || 'Failed to delete document');

    await window.store.fetchAll();
    return res;
  }
}

window.documentService = new DocumentService();
