# DocuMark Studio 🚀
### Modern Markdown Editor & High-Fidelity PDF Exporter

DocuMark Studio is a sleek, fast, and feature-rich web application designed for writing, previewing, and exporting Markdown documents to professional, editorial-grade PDFs with zero quality loss.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## ✨ Key Features

### 1. Rich Markdown & GFM Rendering
- **Full GFM Support:** Headings with automatic anchors, task lists (`- [ ]`, `- [x]`), blockquotes, and styled tables.
- **Scientific Math (KaTeX):** High-speed rendering for inline math (`$E = mc^2$`) and display formulas (`$$\int f(x) dx$$`).
- **Syntax Highlighting (Highlight.js):** Automatic language detection with a 1-click code copy button.
- **Diagrams & Flowcharts (Mermaid.js):** Native rendering for sequence diagrams, state machines, and flowcharts.
- **GitHub Callouts & Alerts:** Standard alerts for `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]`, and `> [!CAUTION]`.
- **Dynamic Table of Contents (TOC):** Floating sidebar with active heading tracking and smooth navigation.

### 2. Typography & Styling Themes
- **Modern Sans (Inter):** Clean, crisp, and ideal for documentation, reports, and digital reading.
- **Academic Serif (Merriweather):** Elegant and formal, perfect for academic papers, literature, and essays.
- **Technical Mono (Fira Code):** Monospaced precision with code ligatures, built for developer guides and changelogs.

### 3. High-Fidelity PDF Export
- **100% Vector Output:** Crisp, selectable text without rasterization or blurry fonts.
- **Smart Page-Break Rules:** Uses `@media print` rules (`break-inside: avoid`) to prevent awkward splits across tables, formulas, and code blocks.
- **Customizable Print Modal:** Configure paper size (A4, US Letter, Legal), orientation (Portrait, Landscape), typography theme, and automatic page breaks before H1 headings.
- **Automatic Print Light Theme:** Automatically adapts contrast during export for clean, professional paper output.

### 4. Flexible Input & Productivity
- **Drag & Drop:** Drop any `.md` or `.txt` file straight onto the workspace.
- **File Upload & Download:** Instant upload button and one-click markdown `.md` file download.
- **Pre-built Templates:** Quick-start with sample templates:
  - Technical Report (featuring math and data tables)
  - Professional Curriculum Vitae (CV / Resume)
  - RESTful API Documentation
- **Auto-Save:** Continuous state persistence to `localStorage` so you never lose your work.
- **Live Statistics:** Real-time counters for words, characters, lines, and estimated reading time.
- **View Modes:** Toggle between Split View (Editor + Preview), Editor Only, or Fullscreen Preview.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite 6
- **Styling:** Tailwind CSS + PostCSS
- **Markdown Engine:** Marked v15 (custom extensions for callouts, tables, and anchors)
- **Math Engine:** KaTeX
- **Code Highlighting:** Highlight.js (Atom One Dark & GitHub Light themes)
- **Diagrams:** Mermaid.js
- **Icons:** Lucide React

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or newer) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arielBiagio/documark-studio.git
   cd documark-studio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## ☁️ Deployment

This project is pre-configured for seamless deployment on [Vercel](https://vercel.com):

1. Import your GitHub repository into Vercel.
2. The build settings will be automatically detected:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Click **Deploy**.

---

## 📄 License

This project is licensed under the MIT License.
