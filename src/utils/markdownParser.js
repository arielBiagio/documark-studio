import { Marked } from 'marked';
import hljs from 'highlight.js';
import katex from 'katex';

// Function to generate clean URL slug
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// Extract Table of Contents from markdown
export function extractHeadings(markdown) {
  if (!markdown) return [];
  const headingRegex = /^(#{1,4})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const rawText = match[2].trim();
    // Strip markdown formatting from title
    const cleanText = rawText
      .replace(/[*_`~[\]]/g, '')
      .replace(/<[^>]*>/g, '');
    const id = slugify(cleanText) || `heading-${headings.length + 1}`;

    headings.push({
      level,
      text: cleanText,
      id,
    });
  }

  return headings;
}

// Process Math formulas before marked parses markdown
function preprocessMath(text) {
  const mathTokens = [];
  let index = 0;

  // Block math: $$ ... $$
  let processed = text.replace(/\$\$([\s\S]+?)\$\$/g, (match, formula) => {
    try {
      const rendered = katex.renderToString(formula.trim(), {
        displayMode: true,
        throwOnError: false,
      });
      const token = `%%MATH_BLOCK_${index++}%%`;
      mathTokens.push({ token, html: `<div class="katex-block my-4 overflow-x-auto py-2 text-center">${rendered}</div>` });
      return token;
    } catch {
      return match;
    }
  });

  // Inline math: $ ... $ (avoiding currency like $100 or escaped \$)
  processed = processed.replace(/(?<!\\)\$([^\$\n]+?)(?<!\\)\$/g, (match, formula) => {
    try {
      const rendered = katex.renderToString(formula.trim(), {
        displayMode: false,
        throwOnError: false,
      });
      const token = `%%MATH_INLINE_${index++}%%`;
      mathTokens.push({ token, html: `<span class="katex-inline">${rendered}</span>` });
      return token;
    } catch {
      return match;
    }
  });

  return { processed, mathTokens };
}

// Convert GitHub style callouts: > [!NOTE] etc.
function preprocessCallouts(text) {
  const calloutTypes = {
    NOTE: { title: 'Nota', color: 'blue' },
    TIP: { title: 'Consejo', color: 'emerald' },
    IMPORTANT: { title: 'Importante', color: 'purple' },
    WARNING: { title: 'Advertencia', color: 'amber' },
    CAUTION: { title: 'Precaución', color: 'rose' },
  };

  const calloutRegex = /^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n((?:>.*(?:\n|$))*)/gmi;

  return text.replace(calloutRegex, (match, type, content) => {
    const upperType = type.toUpperCase();
    const config = calloutTypes[upperType] || { title: type, color: 'blue' };
    
    // Clean blockquote arrows from content
    const rawContent = content
      .split('\n')
      .map(line => line.replace(/^>\s?/, ''))
      .join('\n')
      .trim();

    // Simple inline formatting for callouts (bold, code, links)
    const formattedContent = rawContent
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-slate-200/50 dark:bg-slate-800 font-mono text-xs text-sky-600 dark:text-sky-300">$1</code>');

    return `\n<div class="callout-card callout-${config.color} my-4 p-4 rounded-xl border border-l-4">
      <div class="callout-header flex items-center gap-2 font-semibold text-sm mb-1.5">
        <span class="callout-badge">${config.title}</span>
      </div>
      <div class="callout-body text-sm leading-relaxed">${formattedContent}</div>
    </div>\n\n`;
  });
}

// Initialize configured Marked instance
const markedInstance = new Marked();

markedInstance.use({
  gfm: true,
  breaks: false,
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const clean = text.replace(/<[^>]*>/g, '');
      const id = slugify(clean) || `heading-${depth}`;

      return `<h${depth} id="${id}" class="group relative flex items-center">
        <a href="#${id}" class="anchor-link absolute -left-5 opacity-0 group-hover:opacity-100 transition-opacity text-sky-500 font-mono no-underline">#</a>
        <span>${text}</span>
      </h${depth}>\n`;
    },
    code({ text, lang }) {
      const language = lang || 'plaintext';

      // Mermaid Diagram
      if (language.trim().toLowerCase() === 'mermaid') {
        const encoded = encodeURIComponent(text);
        return `<div class="mermaid-container my-6 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-center overflow-x-auto" data-code="${encoded}">
          <pre class="mermaid text-center">${text}</pre>
        </div>\n`;
      }

      // Syntax highlight
      let highlighted;
      if (hljs.getLanguage(language)) {
        try {
          highlighted = hljs.highlight(text, { language }).value;
        } catch {
          highlighted = hljs.highlightAuto(text).value;
        }
      } else {
        highlighted = hljs.highlightAuto(text).value;
      }

      const encodedCode = encodeURIComponent(text);

      return `<div class="code-block-wrapper my-5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-900">
        <div class="code-header flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700/60 text-xs font-mono text-slate-400">
          <span class="font-medium text-slate-300 uppercase">${language}</span>
          <button type="button" class="copy-code-btn flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs" data-raw="${encodedCode}">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            <span>Copiar</span>
          </button>
        </div>
        <pre class="m-0 p-4 overflow-x-auto text-sm font-mono leading-relaxed"><code class="hljs language-${language}">${highlighted}</code></pre>
      </div>\n`;
    }
  },
  hooks: {
    postprocess(html) {
      // Wrap tables in responsive, stylish containers
      return html
        .replace(/<table>/g, '<div class="table-container my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"><table>')
        .replace(/<\/table>/g, '</table></div>');
    }
  }
});

// Main export to render markdown to HTML string
export function renderMarkdownToHtml(markdown) {
  if (!markdown) return '';

  // 1. Preprocess Callouts & Math
  const withCallouts = preprocessCallouts(markdown);
  const { processed, mathTokens } = preprocessMath(withCallouts);

  // 2. Parse using configured markedInstance
  let rawHtml = markedInstance.parse(processed);

  // 3. Re-inject rendered math tokens
  mathTokens.forEach(({ token, html }) => {
    rawHtml = rawHtml.replaceAll(token, html);
  });

  return rawHtml;
}
