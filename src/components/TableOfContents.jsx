import React from 'react';
import { ListTree, ChevronRight } from 'lucide-react';

export default function TableOfContents({ headings, onSelectHeading, isOpen, setIsOpen }) {
  if (!headings || headings.length === 0) return null;

  return (
    <div
      id="toc-sidebar"
      className={`fixed lg:sticky top-20 right-4 lg:right-0 z-20 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-10'
      }`}
    >
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all">
        {/* Toggle Header */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors select-none"
          title={isOpen ? 'Contraer índice' : 'Ver índice del documento'}
        >
          <div className="flex items-center gap-2">
            <ListTree className="w-4 h-4 text-sky-500 shrink-0" />
            {isOpen && (
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Índice
              </span>
            )}
          </div>
          <ChevronRight
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-90' : ''
            }`}
          />
        </div>

        {/* Headings List */}
        {isOpen && (
          <div className="max-h-[calc(70vh-80px)] overflow-y-auto px-3 py-2 space-y-1 text-xs">
            {headings.map((h, i) => {
              const indent = (h.level - 1) * 12;
              return (
                <button
                  key={`${h.id}-${i}`}
                  onClick={() => onSelectHeading(h.id)}
                  style={{ paddingLeft: `${indent + 6}px` }}
                  className={`w-full text-left py-1 rounded-md text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors truncate block ${
                    h.level === 1 ? 'font-semibold text-slate-800 dark:text-slate-200' : ''
                  }`}
                  title={h.text}
                >
                  <span className="opacity-40 font-mono mr-1">{'#'.repeat(h.level)}</span>
                  {h.text}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
