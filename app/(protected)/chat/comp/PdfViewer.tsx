"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface PdfViewerProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  name?: string;
}

export default function PdfViewer({
  isOpen,
  onClose,
  url,
  name,
}: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setNumPages(0);
    }
  }, [isOpen, url]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col bg-zinc-950"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* HEADER */}
          <motion.header
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-zinc-950 px-4 sm:px-6"
          >
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-90"
              >
                <X size={18} />
              </button>

              <p className="truncate text-sm font-medium text-white">
                {name || "PDF Document"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {/* DOWNLOAD */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-90"
              >
                <Download size={17} />
              </a>

              {/* EXTERNAL */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-90"
              >
                <ExternalLink size={17} />
              </a>
            </div>
          </motion.header>

          {/* PDF AREA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="min-h-0 flex-1 overflow-y-auto bg-zinc-800 p-3 sm:p-6"
          >
            <div className="flex min-h-full justify-center">
              <Document
                file={url}
                onLoadSuccess={({ numPages }) => {
                  setNumPages(numPages);
                  setLoading(false);
                }}
                onLoadError={() => {
                  setLoading(false);
                }}
                loading={
                  <div className="flex min-h-[300px] items-center justify-center text-sm text-white/60">
                    Loading PDF...
                  </div>
                }
              >
                <div className="flex flex-col items-center gap-4">
                  {Array.from({ length: numPages }, (_, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      width={Math.min(850, window.innerWidth - 40)}
                      renderTextLayer
                      renderAnnotationLayer
                      className="overflow-hidden rounded-md shadow-2xl"
                    />
                  ))}
                </div>
              </Document>
            </div>

            {loading && (
              <div className="fixed inset-0 top-16 flex items-center justify-center pointer-events-none">
                <div className="rounded-lg bg-black/50 px-4 py-2 text-sm text-white">
                  Loading PDF...
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}