module.exports = {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        'headspace-purple': '#61398B',
        'headspace-orange': '#FF7E1D',
        'headspace-blue': '#32ABFF',
        'headspace-yellow': '#FEE24F',
        'headspace-lilac': '#A993BC',
        'headspace-night-blue': '#1B2655',
        'risk-low': '#4ade80',
        'risk-medium': '#facc15',
        'risk-high': '#f87171',
        'risk-extreme': '#dc2626',
      },
      borderRadius: {
        'card': '12px',
      },
    },
  },
  plugins: [],
}