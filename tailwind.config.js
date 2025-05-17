import { heroui } from '@heroui/react'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    heroui({
      layout: {
        dividerWeight: '1px',
        disabledOpacity: 0.45,
        fontSize: {
          tiny: '0.75rem',
          small: '0.875rem',
          medium: '0.9375rem',
          large: '1.125rem',
        },
        lineHeight: {
          tiny: '1rem',
          small: '1.25rem',
          medium: '1.5rem',
          large: '1.75rem',
        },
        radius: {
          small: '6px',
          medium: '8px',
          large: '12px',
        },
        borderWidth: {
          small: '1px',
          medium: '1px',
          large: '2px',
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              50: '#eef2ff',
              100: '#e0e7ff',
              200: '#c7d2fe',
              300: '#a5b4fc',
              400: '#818cf8',
              500: '#6366f1',
              600: '#4f46e5',
              700: '#4338ca',
              800: '#3730a3',
              900: '#312e81',
              DEFAULT: '#4f46e5',
              foreground: '#ffffff',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              50: '#312e81',
              100: '#3730a3',
              200: '#4338ca',
              300: '#4f46e5',
              400: '#6366f1',
              500: '#818cf8',
              600: '#a5b4fc',
              700: '#c7d2fe',
              800: '#e0e7ff',
              900: '#eef2ff',
              DEFAULT: '#818cf8',
              foreground: '#000000',
            },
          },
        },
      },
    }),
  ],
}
