import React, { useState, useEffect } from 'react';
import {
  Printer,
  X,
  FileCheck,
  Sparkles
} from 'lucide-react';

export default function PdfExportModal({
  isOpen,
  onClose,
  onPrint,
  docTitle,
  fontTheme,
  setFontTheme
}) {
  const [paperSize, setPaperSize] = useState('a4');
  const [orientation, setOrientation] = useState('portrait');
  const [styleTheme, setStyleTheme] = useState(fontTheme || 'modern');
  const [breakH1, setBreakH1] = useState(false);

  // Sync with current fontTheme when opening
  useEffect(() => {
    if (fontTheme) {
      setStyleTheme(fontTheme);
    }
  }, [fontTheme, isOpen]);

  if (!isOpen) return null;

  const handleSelectStyle = (themeId) => {
    setStyleTheme(themeId);
    setFontTheme(themeId); // Instantly update preview in background!
  };

  const handleTriggerPrint = () => {
    // Remove previous classes
    document.body.classList.remove(
      'print-letter',
      'print-landscape',
      'print-break-h1',
      'font-modern',
      'font-academic',
      'font-tech'
    );

    if (paperSize === 'letter') document.body.classList.add('print-letter');
    if (orientation === 'landscape') document.body.classList.add('print-landscape');
    if (breakH1) document.body.classList.add('print-break-h1');

    document.body.classList.add(`font-${styleTheme}`);
    setFontTheme(styleTheme);

    onPrint({
      paperSize,
      orientation,
      styleTheme,
      breakH1,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-white">Exportar a PDF Profesional</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Configura el diseño y tipografía de tu documento</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Body */}
        <div className="p-6 space-y-5 text-sm">
          {/* Paper Size & Orientation */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Tamaño de Hoja
              </label>
              <select
                value={paperSize}
                onChange={(e) => setPaperSize(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 outline-none focus:border-sky-500"
              >
                <option value="a4">A4 (210 × 297 mm)</option>
                <option value="letter">Carta / US Letter (8.5 × 11 in)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Orientación
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setOrientation('portrait')}
                  className={`py-1 text-xs font-medium rounded-lg transition-all ${
                    orientation === 'portrait'
                      ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  Vertical
                </button>
                <button
                  type="button"
                  onClick={() => setOrientation('landscape')}
                  className={`py-1 text-xs font-medium rounded-lg transition-all ${
                    orientation === 'landscape'
                      ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  Horizontal
                </button>
              </div>
            </div>
          </div>

          {/* Typography Style */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Estilo Tipográfico
              </label>
              <span className="text-[11px] text-sky-500 font-medium">Vista previa en tiempo real</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'modern', label: 'Moderna (Inter)', desc: 'Limpia, sans-serif' },
                { id: 'academic', label: 'Académica (Serif)', desc: 'Merriweather editorial' },
                { id: 'tech', label: 'Tech / Código', desc: 'Fira Code monospace' },
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => handleSelectStyle(style.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    styleTheme === style.id
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/60 ring-2 ring-sky-500/20 text-sky-950 dark:text-sky-200 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="font-bold text-xs">{style.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{style.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Page Breaks & Rules */}
          <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={breakH1}
                onChange={(e) => setBreakH1(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300 dark:border-slate-700"
              />
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Insertar salto de página antes de cada título principal (H1)
              </span>
            </label>

            <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
              <FileCheck className="w-4 h-4 shrink-0" />
              <span>Protección inteligente de cortes: las tablas y códigos nunca se dividirán a mitad de página.</span>
            </div>
          </div>

          {/* Quick Tip Box */}
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-800 dark:text-amber-200 text-xs flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Consejo para acabado de imprenta:</span> En el cuadro de diálogo que se abrirá, asegúrate de seleccionar <strong className="underline">Guardar como PDF</strong> y desmarcar "Encabezados y pies de página".
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleTriggerPrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Abrir Diálogo de PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
