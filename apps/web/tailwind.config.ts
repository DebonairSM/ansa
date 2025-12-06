const config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: { 
    extend: { 
      colors: { 
        brand: '#f0c000',
        'brand-yellow': '#f0c000',
        'brand-yellow-dark': '#d4a600',
        'text-primary': '#1a1a1a',
        'text-secondary': '#666666',
        'bg-gray': '#f5f5f5',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    } 
  },
  plugins: [require('@tailwindcss/typography')]
};
export default config;
