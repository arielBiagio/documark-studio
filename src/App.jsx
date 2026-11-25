import React, { useState, useEffect, useRef, useMemo } from 'react';
import mermaid from 'mermaid';
import Navbar from './components/Navbar';
import Toolbar from './components/Toolbar';
import TableOfContents from './components/TableOfContents';
import StatsBar from './components/StatsBar';
import PdfExportModal from './components/PdfExportModal';
import { SAMPLE_DOCUMENTS } from './utils/sampleDocuments';
import { renderMarkdownToHtml, extractHeadings } from './utils/markdownParser';
import { FileUp, Sparkles, BookOpen } from 'lucide-react';

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  fontFamily: 'Inter, system-ui, sans-serif',
});

export default function App() {
  // Document state
  const [markdown, setMarkdown] = useState(() => {
    return localStorage.getItem('documark_content') || SAMPLE_DOCUMENTS.technical.content;
  });
  const [docTitle, setDocTitle] = useState(() => {
    return localStorage.getItem('documark_title') || SAMPLE_DOCUMENTS.technical.title;
  });

  // UI state
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'editor' | 'preview'
  const [isDark, setIsDark] = useState(true);
  const [fontTheme, setFontTheme] = useState('modern'); // 'modern' | 'academic' | 'tech'
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [syncScroll, setSyncScroll] = useState(true);
  const [docWidth, setDocWidth] = useState('standard'); // 'compact' (680px) | 'standard' (840px) | 'wide' (100%)
  const [zoom, setZoom] = useState(100);

  // Notification feedbacks
  const [copiedMd, setCopiedMd] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);

  // PWA install prompt
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };
    const handleAppInstalled = () => {
      setInstallPromptEvent(null);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!installPromptEvent) return;
    installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;
    if (outcome === 'accepted') {
      setInstallPromptEvent(null);
    }
  };

  // Refs for scrolling and textarea
  const editorTextareaRef = useRef(null);
  const previewContainerRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Sync dark class on document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      const darkSheet = document.getElementById('hljs-dark-theme');
      const lightSheet = document.getElementById('hljs-light-theme');
      if (darkSheet) darkSheet.disabled = false;
      if (lightSheet) lightSheet.disabled = true;
    } else {
      document.documentElement.classList.remove('dark');
      const darkSheet = document.getElementById('hljs-dark-theme');
      const lightSheet = document.getElementById('hljs-light-theme');
      if (darkSheet) darkSheet.disabled = true;
      if (lightSheet) lightSheet.disabled = false;
    }
  }, [isDark]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('documark_content', markdown);
  }, [markdown]);

  useEffect(() => {
    localStorage.setItem('documark_title', docTitle);
  }, [docTitle]);

  // Compiled HTML & Headings outline
  const htmlContent = useMemo(() => {
    return renderMarkdownToHtml(markdown);
  }, [markdown]);

  const headings = useMemo(() => {
    return extractHeadings(markdown);
  }, [markdown]);

  // Render Mermaid diagrams whenever HTML updates
  useEffect(() => {
    if (previewContainerRef.current) {
      try {
        mermaid.run({
          nodes: previewContainerRef.current.querySelectorAll('.mermaid'),
        });
      } catch (err) {
        console.warn('Mermaid rendering warning:', err);
      }
    }
  }, [htmlContent]);

  // Setup click listeners on copy buttons inside preview code blocks
  useEffect(() => {
    const previewEl = previewContainerRef.current;
    if (!previewEl) return;

    const handleClick = (e) => {
      const copyBtn = e.target.closest('.copy-code-btn');
      if (copyBtn) {
        const rawCode = decodeURIComponent(copyBtn.dataset.raw || '');
        if (rawCode) {
          navigator.clipboard.writeText(rawCode).then(() => {
            const span = copyBtn.querySelector('span');
            if (span) {
              const orig = span.innerText;
              span.innerText = '¡Copiado!';
              copyBtn.classList.add('text-emerald-400');
              setTimeout(() => {
                span.innerText = orig;
                copyBtn.classList.remove('text-emerald-400');
              }, 2000);
            }
          });
        }
      }
    };

    previewEl.addEventListener('click', handleClick);
    return () => previewEl.removeEventListener('click', handleClick);
  }, [htmlContent]);

  // Sync scroll implementation
  const handleEditorScroll = () => {
    if (!syncScroll || isScrollingRef.current) return;
    const editor = editorTextareaRef.current;
    const preview = previewContainerRef.current;
    if (!editor || !preview) return;

    isScrollingRef.current = true;
    const percentage = editor.scrollTop / (editor.scrollHeight - editor.clientHeight || 1);
    preview.scrollTop = percentage * (preview.scrollHeight - preview.clientHeight);
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 40);
  };

  const handlePreviewScroll = () => {
    if (!syncScroll || isScrollingRef.current) return;
    const editor = editorTextareaRef.current;
    const preview = previewContainerRef.current;
    if (!editor || !preview) return;

    isScrollingRef.current = true;
    const percentage = preview.scrollTop / (preview.scrollHeight - preview.clientHeight || 1);
    editor.scrollTop = percentage * (editor.scrollHeight - editor.clientHeight);
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 40);
  };

  // Format insertion from toolbar
  const handleInsertFormat = (prefix, suffix) => {
    const textarea = editorTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);

    const replacement = `${prefix}${selectedText || 'texto'}${suffix}`;
    const newMarkdown = markdown.substring(0, start) + replacement + markdown.substring(end);
    setMarkdown(newMarkdown);

    // Reposition cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + (selectedText.length || 5)
      );
    }, 10);
  };

  // Upload file handler
  const handleUploadFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setMarkdown(text);
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, '');
        setDocTitle(nameWithoutExt);
      }
    };
    reader.readAsText(file);
  };

  // Drag and Drop files onto window
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setIsDraggingFile(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      handleUploadFile(files[0]);
    }
  };

  // Load sample template
  const handleLoadTemplate = (templateKey) => {
    const template = SAMPLE_DOCUMENTS[templateKey];
    if (template) {
      setMarkdown(template.content);
      setDocTitle(template.title);
    }
  };

  // Clear document
  const handleClear = () => {
    if (window.confirm('¿Seguro que deseas vaciar el documento?')) {
      setMarkdown('');
      setDocTitle('Nuevo Documento');
    }
  };

  // Copy Markdown
  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdown).then(() => {
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 2000);
    });
  };

  // Copy HTML
  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlContent).then(() => {
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2000);
    });
  };

  // Download .md file
  const handleDownloadMd = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docTitle.trim() || 'documento'}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Trigger Print to PDF with full theme restoration
  const handleExecutePrint = () => {
    setIsPdfModalOpen(false);

    // Temporarily switch off dark mode class so all colors print in pure high-contrast light mode
    const wasDark = document.documentElement.classList.contains('dark');
    document.documentElement.classList.remove('dark');

    const handleAfterPrint = () => {
      if (wasDark) {
        document.documentElement.classList.add('dark');
      }
      document.body.classList.remove(
        'print-letter',
        'print-landscape',
        'print-break-h1',
        'font-modern',
        'font-academic',
        'font-tech'
      );
      window.removeEventListener('afterprint', handleAfterPrint);
    };

    window.addEventListener('afterprint', handleAfterPrint);

    setTimeout(() => {
      window.print();
    }, 200);
  };

  // Scroll to heading in preview
  const handleSelectHeading = (id) => {
    const preview = previewContainerRef.current;
    if (!preview) return;
    const targetElement = preview.querySelector(`#${id}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Document width styling
  const docWidthClass = useMemo(() => {
    if (docWidth === 'compact') return 'max-w-[680px]';
    if (docWidth === 'standard') return 'max-w-[840px]';
    return 'max-w-none';
  }, [docWidth]);

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="h-full flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans overflow-hidden transition-colors"
    >
      {/* Drag & Drop Visual Overlay */}
      {isDraggingFile && (
        <div className="fixed inset-0 z-50 bg-sky-600/90 backdrop-blur-md flex flex-col items-center justify-center text-white pointer-events-none animate-in fade-in">
          <FileUp className="w-16 h-16 mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold">Suelta tu archivo Markdown (.md) aquí</h2>
          <p className="text-sm text-sky-100 mt-1">Se cargará automáticamente en el editor con vista previa instantánea</p>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Navbar
        docTitle={docTitle}
        setDocTitle={setDocTitle}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isDark={isDark}
        setIsDark={setIsDark}
        onUploadFile={handleUploadFile}
        onLoadTemplate={handleLoadTemplate}
        onClear={handleClear}
        onExportPdf={() => setIsPdfModalOpen(true)}
        onDownloadMd={handleDownloadMd}
        onCopyHtml={handleCopyHtml}
        onCopyMarkdown={handleCopyMarkdown}
        copiedMd={copiedMd}
        copiedHtml={copiedHtml}
        canInstall={!!installPromptEvent}
        onInstallApp={handleInstallApp}
      />

      {/* Formatting Toolbar */}
      {viewMode !== 'preview' && (
        <Toolbar onInsertFormat={handleInsertFormat} />
      )}

      {/* Main Dual-Pane Viewport */}
      <main id="main-viewport" className="flex-1 flex overflow-hidden relative">
        {/* LEFT: Markdown Editor Pane */}
        {(viewMode === 'split' || viewMode === 'editor') && (
          <section
            id="editor-container"
            className={`flex flex-col h-full border-r border-slate-200 dark:border-slate-800 transition-all ${
              viewMode === 'editor' ? 'w-full' : 'w-1/2'
            }`}
          >
            <div className="flex-1 relative overflow-hidden bg-white dark:bg-slate-900/60">
              <textarea
                ref={editorTextareaRef}
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                onScroll={handleEditorScroll}
                placeholder="Escribe o pega aquí tu texto en Markdown (# Título, **negrita**, tablas, listas, fórmulas LaTeX $$...$$, etc.) o arrastra un archivo .md..."
                className="w-full h-full p-6 text-sm font-mono leading-relaxed bg-transparent text-slate-800 dark:text-slate-100 outline-none resize-none selection:bg-sky-500/20"
                spellCheck={false}
              />

              {/* Empty state hint */}
              {!markdown && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-slate-400 p-8 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3 text-slate-500">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-sm text-slate-600 dark:text-slate-300">Editor vacío</h3>
                  <p className="text-xs text-slate-400 max-w-sm mt-1">
                    Pega tu contenido aquí, sube un archivo Markdown o haz clic en "Plantillas" arriba para explorar ejemplos listos.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* RIGHT: High-Fidelity Preview Pane */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <section
            id="preview-viewport"
            className={`flex-1 flex flex-col h-full bg-slate-100 dark:bg-slate-950/80 overflow-hidden relative ${
              viewMode === 'preview' ? 'w-full' : 'w-1/2'
            }`}
          >
            {/* Table of Contents Floating Widget */}
            <TableOfContents
              headings={headings}
              onSelectHeading={handleSelectHeading}
              isOpen={isTocOpen}
              setIsOpen={setIsTocOpen}
            />

            {/* Scrollable Document Area */}
            <div
              id="preview-scroll-area"
              ref={previewContainerRef}
              onScroll={handlePreviewScroll}
              className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 flex justify-center items-start"
            >
              {/* White Sheet / Paper Presentation Card with Dynamic Typography */}
              <article
                id="preview-document-sheet"
                style={{ zoom: `${zoom}%` }}
                className={`w-full ${docWidthClass} theme-font-${fontTheme} bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xl shadow-slate-200/50 dark:shadow-black/40 rounded-2xl p-8 sm:p-12 transition-all min-h-[90vh]`}
              >
                {htmlContent ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                    className="markdown-body dark:text-slate-100"
                  />
                ) : (
                  <div className="py-24 text-center text-slate-400">
                    <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-30 animate-pulse" />
                    <p className="text-sm font-medium">La vista previa aparecerá aquí al escribir o pegar tu Markdown</p>
                  </div>
                )}
              </article>
            </div>
          </section>
        )}
      </main>

      {/* Bottom Status, Stats & Live Typography Selector */}
      <StatsBar
        markdown={markdown}
        zoom={zoom}
        setZoom={setZoom}
        docWidth={docWidth}
        setDocWidth={setDocWidth}
        syncScroll={syncScroll}
        setSyncScroll={setSyncScroll}
        fontTheme={fontTheme}
        setFontTheme={setFontTheme}
      />

      {/* PDF Export Settings Modal */}
      <PdfExportModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        onPrint={handleExecutePrint}
        docTitle={docTitle}
        fontTheme={fontTheme}
        setFontTheme={setFontTheme}
      />
    </div>
  );
}
