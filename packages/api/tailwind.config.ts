import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.html',
    './src/**/*.jsx',
    './src/**/*.tsx',
  ],
  theme: {
    fontFamily: {
      // Include the default font family for the platform by default
      sans: ['"Basier Square"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      mono: ['"Basier Square Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    }
  }
}

export default config satisfies Config;