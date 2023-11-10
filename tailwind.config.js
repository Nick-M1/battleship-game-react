/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'riffic': ["Riffic", "sans-serif"],
      'stencil-army': ["StencilCargoArmy", "sans-serif"]
    },

    extend: {
      colors: {
        lightgreen: '#ECEED4',
        darkgreen: '#749654',
        lightbrown: '#FFCE9E',
        darkbrown: '#D18B47',

        'cell-light': 'rgb(var(--color-cell-light) / <alpha-value>)',
        'cell-dark': 'rgb(var(--color-cell-dark) / <alpha-value>)',
      },

      height: {
        '90%': '90%',
        '190%': '190%',
        '290%': '290%',
        '390%': '390%',
        '490%': '490%',
        screen: ['100vh', '100dvh'],
      },
      width: {
        screen: ['100vw', '100dvw'],
      },
      backgroundImage: {
        'home-background-1': "url('assets/home-background/home-background-1.jpg')",
        'home-background-2': "url('assets/home-background/home-background-2.jpg')",
        'home-background-3': "url('assets/home-background/home-background-3.jpg')",
        'home-background-4': "url('assets/home-background/home-background-4.jpg')",
        'home-background-5': "url('assets/home-background/home-background-5.jpg')",
        'home-background-6': "url('assets/home-background/home-background-6.jpg')",
        'home-background-7': "url('assets/home-background/home-background-7.jpg')",
        'home-background-8': "url('assets/home-background/home-background-8.jpg')",
        'home-background-9': "url('assets/home-background/home-background-9.jpg')",
        'home-background-10': "url('assets/home-background/home-background-10.jpg')",
        'home-background-11': "url('assets/home-background/home-background-11.jpg')",

        'menu-background-1': "url('assets/menu-background/menu-background-1.jpg')",
        'menu-background-2': "url('assets/menu-background/menu-background-2.jpg')",
        'menu-background-3': "url('assets/menu-background/menu-background-3.jpg')",
        'menu-background-4': "url('assets/menu-background/menu-background-4.jpg')",
        'menu-background-5': "url('assets/menu-background/menu-background-5.jpg')",
        'menu-background-6': "url('assets/menu-background/menu-background-6.jpg')",

        'game-background': "var(--game-background-image)",
      },

      borderWidth: {
        3: '3px'
      },
      opacity: {
        15: '.15'
      },
      margin: {
        0.25: '.25',
        0.75: '.75'
      },
      gridTemplateRows: {
        '10': 'repeat(10, minmax(0, 1fr))',
      },
      rotate: {
        '270': '270deg',
      },

      keyframes: {
        bounceRight: {
          '0%, 100%': {transform: 'translateX(-25%)'},
          '50%': {transform: 'translateX(0%)'},
        },
      },
      animation: {
        bounceRight: 'bounceRight 1s infinite',
      },
    },
  },
  plugins: [
      require('@tailwindcss/container-queries')
  ],
}

