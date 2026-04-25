declare module 'pdfjs-dist/build/pdf.js' {
  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
    destroy(): Promise<void>;
  }

  export interface PDFPageProxy {
    getTextContent(): Promise<{ items: Array<{ str?: string }> }>;
  }

  export interface PDFLoadingTask {
    promise: Promise<PDFDocumentProxy>;
  }

  export function getDocument(params: { data: ArrayBuffer; disableWorker?: boolean }): PDFLoadingTask;

  export default { getDocument };
}
