import React from 'react';
import { Clock, Type, AlignLeft, Layers, ZoomIn, ZoomOut } from 'lucide-react';

export default function StatsBar({
  markdown,
  zoom,
  setZoom,
  docWidth,
  setDocWidth,
  syncScroll,
  setSyncScroll,
  fontTheme,
  setFontTheme
}) {
  const text = markdown || '';
  const characters = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split('\n').length : 0;
  const readingTime = Math.ceil(words / 200); // 200 words per minute average

  return (
    <footer id="app-statsbar" className="h-8 border-t border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 select-none z-20">
      {/* Left: Text Stats */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5" title="Palabras">
          <Type className="w-3.5 h-3.5 text-sky-500" />
          <span>{words.toLocaleString()} <span className="hidden sm:inline">palabras</span></span>
        </div>

        <div className="flex items-center gap-1.5" title="Caracteres">
          <AlignLeft className="w-3.5 h-3.5 text-indigo-500" />
          <span>{characters.toLocaleString()} <span className="hidden sm:inline">caracteres</span></span>
        </div>

        <div className="hidden md:flex items-center gap-1.5" title="Líneas de texto">
          <Layers className="w-3.5 h-3.5 text-slate-400" />
          <span>{lines} líneas</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-slate-400" title="Tiempo estimado de lectura">
          <Clock className="w-3.5 h-3.5 text-emerald-500" />
          <span>~{readingTime} min</span>
        </div>
      </div>

      {/* Right: Preview Controls & Typography Selector */}
      <div className="flex items-center gap-3">
        {/* Live Font Theme Selector */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-slate-400 hidden md:inline">Tipografía:</span>
          {[
            { id: 'modern', label: 'Moderna (Inter)' },
            { id: 'academic', label: 'Serif (Editorial)' },
            { id: 'tech', label: 'Mono (Código)' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFontTheme(f.id)}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${
                fontTheme === f.id
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
              title={`Cambiar tipografía a ${f.label}`}
            >
              {f.id === 'modern' ? 'Sans' : f.id === 'academic' ? 'Serif' : 'Mono'}
            </button>
          ))}
        </div>

        <div className="h-3 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

        {/* Sync Scroll Toggle */}
        <button
          type="button"
          onClick={() => setSyncScroll(!syncScroll)}
          className={`hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded transition-colors ${
            syncScroll ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-400 hover:text-slate-600'
          }`}
          title="Sincronizar desplazamiento entre editor y vista previa"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${syncScroll ? 'bg-sky-500 animate-pulse' : 'bg-slate-400'}`}></span>
          <span>Sync</span>
        </button>

        <div className="h-3 w-px bg-slate-200 dark:bg-slate-700 hidden lg:block" />

        {/* Document Sheet Width */}
        <div className="hidden lg:flex items-center gap-1">
          <span className="text-[10px] text-slate-400">Ancho:</span>
          {['compact', 'standard', 'wide'].map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setDocWidth(w)}
              className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
                docWidth === w
                  ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                  : 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500'
              }`}
            >
              {w === 'compact' ? '680' : w === 'standard' ? '840' : '100%'}
            </button>
          ))}
        </div>

        <div className="h-3 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

        {/* Zoom Level */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoom(Math.max(75, zoom - 10))}
            className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Reducir zoom"
          >
            <ZoomOut className="w-3 h-3" />
          </button>
          <span className="w-8 text-center">{zoom}%</span>
          <button
            type="button"
            onClick={() => setZoom(Math.min(150, zoom + 10))}
            className="p-0.5 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Aumentar zoom"
          >
            <ZoomIn className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
