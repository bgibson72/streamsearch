import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Modern color palette
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'accent': 'var(--color-accent)',
        'muted': 'var(--color-muted)',
        'muted-foreground': 'var(--color-muted-foreground)',
        'background': 'var(--color-background)',
        'foreground': 'var(--color-foreground)',
        'card': 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        'border': 'var(--color-border)',
        'input': 'var(--color-input)',
        'destructive': 'var(--color-destructive)',
        'success': 'var(--color-success)',
        'warning': 'var(--color-warning)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      borderRadius: {
        'DEFAULT': 'var(--radius)',
        'sm': 'calc(var(--radius) - 4px)',
        'md': 'var(--radius)',
        'lg': 'calc(var(--radius) + 4px)',
        'xl': 'calc(var(--radius) + 8px)',
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)',
        'medium': '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
        'large': '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)',
      },
    },
  },
  plugins: [],
}

export default config
