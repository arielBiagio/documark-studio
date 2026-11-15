import React from 'react';
import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Code,
  FileCode,
  Link,
  Image,
  Table,
  CheckSquare,
  Sigma,
  AlertCircle
} from 'lucide-react';

export default function Toolbar({ onInsertFormat }) {
  const tools = [
    { label: 'Negrita', icon: Bold, syntax: '**texto**', prefix: '**', suffix: '**' },
    { label: 'Cursiva', icon: Italic, syntax: '*texto*', prefix: '*', suffix: '*' },
    { label: 'Tachado', icon: Strikethrough, syntax: '~~texto~~', prefix: '~~', suffix: '~~' },
    { divider: true },
    { label: 'Título 1', icon: Heading1, syntax: '# Título 1', prefix: '# ', suffix: '' },
    { label: 'Título 2', icon: Heading2, syntax: '## Título 2', prefix: '## ', suffix: '' },
    { label: 'Título 3', icon: Heading3, syntax: '### Título 3', prefix: '### ', suffix: '' },
    { divider: true },
    { label: 'Cita', icon: Quote, syntax: '> Cita destacada', prefix: '> ', suffix: '' },
    { label: 'Código en línea', icon: Code, syntax: '`código`', prefix: '`', suffix: '`' },
    { label: 'Bloque de código', icon: FileCode, syntax: '```javascript\n// tu código\n```', prefix: '```javascript\n', suffix: '\n```' },
    { divider: true },
    { label: 'Enlace', icon: Link, syntax: '[Texto](https://ejemplo.com)', prefix: '[', suffix: '](https://ejemplo.com)' },
    { label: 'Imagen', icon: Image, syntax: '![Descripción](https://via.placeholder.com/600x300)', prefix: '![', suffix: '](https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800)' },
    { label: 'Tabla', icon: Table, syntax: '| Encabezado 1 | Encabezado 2 |\n| :--- | :--- |\n| Fila 1 | Dato |\n| Fila 2 | Dato |', prefix: '\n| Columna 1 | Columna 2 | Columna 3 |\n| :--- | :---: | ---: |\n| Valor A | Centrado | $99.00 |\n| Valor B | Centrado | $150.00 |\n', suffix: '' },
    { label: 'Lista de Tareas', icon: CheckSquare, syntax: '- [ ] Tarea pendiente\n- [x] Tarea completada', prefix: '\n- [ ] Tarea por hacer\n- [x] Tarea terminada\n', suffix: '' },
    { divider: true },
    { label: 'Fórmula Matemática', icon: Sigma, syntax: '$$\nE = mc^2\n$$', prefix: '\n$$\n', suffix: '\n$$\n' },
    { label: 'Nota / Alerta', icon: AlertCircle, syntax: '> [!NOTE]\n> Mensaje informativo', prefix: '\n> [!NOTE]\n> Información importante aquí.\n', suffix: '' },
  ];

  return (
    <div id="app-toolbar" className="h-10 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-3 flex items-center gap-1 overflow-x-auto text-slate-600 dark:text-slate-400 select-none">
      <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mr-1.5 hidden sm:inline">Formato</span>
      
      {tools.map((tool, idx) => {
        if (tool.divider) {
          return <div key={`div-${idx}`} className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1 shrink-0" />;
        }
        const IconComponent = tool.icon;
        return (
          <button
            key={tool.label}
            type="button"
            onClick={() => onInsertFormat(tool.prefix, tool.suffix)}
            className="p-1.5 rounded-lg hover:bg-slate-200/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all shrink-0"
            title={`${tool.label} (${tool.syntax})`}
          >
            <IconComponent className="w-3.5 h-3.5" />
          </button>
        );
      })}
    </div>
  );
}
