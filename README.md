# DocuMark Studio 🚀
### Editor Markdown & Exportador PDF Profesional de Alta Fidelidad

DocuMark Studio es una aplicación web moderna, reactiva y optimizada diseñada para escribir, previsualizar y exportar documentos Markdown a formato PDF editorial sin pérdidas de calidad.

---

## ✨ Características Principales

1. **Visualización Markdown Completa (GFM):**
   - Encabezados con anclajes automáticos (#) e índice de contenido interactivo (**TOC**).
   - Fórmulas matemáticas y científicas renderizadas con **KaTeX** ($\LaTeX$, tanto en línea como en bloque `$$...$$`).
   - Bloques de código con resaltado sintáctico automático (**Highlight.js**) y botón de copia con 1 clic.
   - Diagramas de flujo y arquitectura con **Mermaid.js**.
   - Alertas y Callouts de GitHub (`> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, `> [!CAUTION]`).
   - Tablas estilizadas con scroll horizontal adaptativo.
   - Listas de tareas interactivas (`- [ ]`, `- [x]`).

2. **Carga y Entrada Flexible:**
   - **Pegar directo:** Edición en tiempo real con resaltado y sincronización de scroll.
   - **Subir archivo:** Botón para cargar archivos `.md` o `.txt`.
   - **Drag & Drop:** Arrastra cualquier archivo Markdown directamente a la ventana de la aplicación.
   - **Plantillas listas:** Incluye ejemplos prediseñados (Informe Técnico con Matemáticas, Currículum Vitae (CV) y Documentación de API).

3. **Motor de Exportación a PDF de Alta Fidelidad:**
   - Hoja con proporción configurable (A4, Carta/Letter, Legal).
   - Orientación Vertical y Horizontal.
   - Reglas `@media print` optimizadas para evitar cortes de tablas y bloques de código a mitad de página (`break-inside: avoid`).
   - Opción para insertar saltos de página automáticos antes de cada título H1.
   - Salida 100% vectorial, con texto seleccionable y tipografía ultra nítida.

4. **Experiencia de Usuario (UI/UX):**
   - Vistas: Dividida (Editor + Preview), Solo Editor y Solo Vista Previa.
   - Modo Oscuro y Modo Claro con paleta refinada en Slate/Sky/Indigo.
   - Selector de ancho de documento (680px, 840px, 100%).
   - Zoom ajustable del 75% al 150%.
   - Métricas en tiempo real: palabras, caracteres, líneas y tiempo estimado de lectura.
   - Guardado automático en el navegador (`localStorage`).

---

## 🚀 Cómo Iniciar la Aplicación

Para ejecutar el servidor de desarrollo localmente:

```bash
npm run dev
```

Luego abre tu navegador en:
👉 **http://localhost:5173**

Para compilar la versión optimizada para producción:

```bash
npm run build
npm run preview
```
