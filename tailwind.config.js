module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
    		sm: '640px',
    	  md: '768px'
    },
    extend: {
      colors: {
        blue: {
          450: '#0077CC'
        },
        poppy: '#FA744E'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
