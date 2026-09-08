/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ground: 'var(--ground)',
        'ground-2': 'var(--ground-2)',
        'ground-3': 'var(--ground-3)',
        panel: 'var(--panel)',
        'panel-2': 'var(--panel-2)',
        'panel-3': 'var(--panel-3)',
        line: 'var(--line)',
        'line-2': 'var(--line-2)',
        'line-soft': 'var(--line-soft)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        'ink-4': 'var(--ink-4)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
        ok: 'var(--ok)',
        warn: 'var(--warn)',
        crit: 'var(--crit)',
        violet: 'var(--violet)',
        idle: 'var(--idle)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Archivo', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
};
