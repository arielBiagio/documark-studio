import React, { useRef } from 'react';
import {
  FileText,
  Upload,
  Download,
  Copy,
  Printer,
  Columns,
  SquareSplitHorizontal,
  Eye,
  FileCode,
  Sun,
  Moon,
  Sparkles,
  Trash2,
  Check,
  ChevronDown,
  BookOpen,
  MonitorDown
} from 'lucide-react';

export default function Navbar({
  docTitle,
  setDocTitle,
  viewMode,
  setViewMode,
  isDark,
  setIsDark,
  onUploadFile,
  onLoadTemplate,
  onClear,
  onExportPdf,
  onDownloadMd,
  onCopyHtml,
  onCopyMarkdown,
  copiedMd,
  copiedHtml,
  canInstall,
  onInstallApp
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadFile(file);
      e.target.value = '';
    }
  };

  return (
    <header id="app-navbar" className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 flex items-center justify-between z-30 select-none">
      {/* Brand & Document Name */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-800 dark:text-white">DocuMark</span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 rounded-full border border-sky-300 dark:border-sky-800">PRO</span>
            </div>
          </div>
        </div>

        <div className="h-5 w-px bg-slate-300 dark:bg-slate-700 mx-1 hidden sm:block" />

        {/* Editable Title */}
        <div className="relative group max-w-xs sm:max-w-sm">
          <input
            type="text"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            placeholder="Título del documento..."
            className="w-full bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60 focus:bg-white dark:focus:bg-slate-800 px-2.5 py-1 text-sm font-medium rounded-lg border border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-sky-500 dark:focus:border-sky-500 outline-none text-slate-800 dark:text-slate-200 transition-all truncate"
            title="Haz clic para renombrar el documento"
          />
        </div>
      </div>

      {/* Center: View Mode Toggles */}
      <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-inner">
        <button
          type="button"
          onClick={() => setViewMode('editor')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            viewMode === 'editor'
              ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          title="Solo Editor"
        >
          <FileCode className="w-3.5 h-3.5" />
          <span>Editor</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('split')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            viewMode === 'split'
              ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          title="Vista Dividida (Editor + Vista Previa)"
        >
          <Columns className="w-3.5 h-3.5" />
          <span>Dividida</span>
        </button>

        <button
          type="button"
          onClick={() => setViewMode('preview')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            viewMode === 'preview'
              ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
          title="Solo Vista Previa"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Vista Previa</span>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".md,.markdown,.txt"
          className="hidden"
        />

        {/* Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all border border-slate-200 dark:border-slate-700"
          title="Subir archivo .md o .txt"
        >
          <Upload className="w-3.5 h-3.5 text-sky-500" />
          <span className="hidden sm:inline">Subir .md</span>
        </button>

        {/* Templates Dropdown */}
        <div className="relative group">
          <button
            type="button"
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all border border-slate-200 dark:border-slate-700"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">Plantillas</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>
          
          <div className="absolute right-0 top-full mt-1.5 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 hidden group-hover:block hover:block z-40 transition-all">
            <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Ejemplos Listos</div>
            <button
              onClick={() => onLoadTemplate('technical')}
              className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-sky-950/50 hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center gap-2"
            >
              <span>🚀</span> Reporte Técnico & Fórmulas
            </button>
            <button
              onClick={() => onLoadTemplate('cv')}
              className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-sky-950/50 hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center gap-2"
            >
              <span>💼</span> Currículum Vitae (CV)
            </button>
            <button
              onClick={() => onLoadTemplate('guide')}
              className="w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-sky-950/50 hover:text-sky-600 dark:hover:text-sky-400 transition-colors flex items-center gap-2"
            >
              <span>📘</span> Documentación de API
            </button>
          </div>
        </div>

        {/* Copy Tools */}
        <div className="hidden lg:flex items-center gap-1">
          <button
            type="button"
            onClick={onCopyMarkdown}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all border border-slate-200 dark:border-slate-700"
            title="Copiar Markdown al portapapeles"
          >
            {copiedMd ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
            <span>{copiedMd ? 'Copiado!' : 'Copiar MD'}</span>
          </button>

          <button
            type="button"
            onClick={onDownloadMd}
            className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700"
            title="Descargar archivo .md"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Dark/Light Switch */}
        <button
          type="button"
          onClick={() => setIsDark(!isDark)}
          className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700"
          title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
        </button>

        {/* Clear Content */}
        <button
          type="button"
          onClick={onClear}
          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all border border-slate-200 dark:border-slate-700"
          title="Limpiar contenido"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Install PWA Button (shown when installable) */}
        {canInstall && (
          <button
            type="button"
            onClick={onInstallApp}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-all"
            title="Instalar DocuMark Studio como aplicación"
          >
            <MonitorDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Instalar</span>
          </button>
        )}

        {/* EXPORT PDF BUTTON - High Impact */}
        <button
          type="button"
          onClick={onExportPdf}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-md shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Exportar PDF</span>
        </button>
      </div>
    </header>
  );
}
