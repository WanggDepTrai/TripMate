/** @type {import('tailwindcss').Config} */

import { type Config } from 'tailwindcss';

const config: Config = {
   content: ['./src/**/*.{ts,tsx}'],

   darkMode: ['class'],

   plugins: [require('tailwindcss-animate')],

   theme: {
      // screens: {
      //    sm: '640px',
      //    md: '768px',
      //    lg: '1024px',
      //    xl: '1280px',
      //    '2xl': '1536px',
      // },

      // container: {
      //    center: true,
      //    padding: {
      //       lg: '2rem',
      //       md: '1.5rem',
      //       sm: '1rem',
      //    },
      // },

      container: {
         center: true, // Centers the container by adding auto margins
         padding: '0.5rem', // Default padding for the container
         screens: {
            sm: '100%', // Width for small screens
            md: '100%', // Width for medium screens
            lg: '1380px', // Width for large screens
            // xl: '90%', // Width for extra-large screens
         },
      },

      extend: {
         borderRadius: {
            // lg: 'var(--radius)',
            // md: 'calc(var(--radius) - 2px)',
            // sm: 'calc(var(--radius) - 4px)',
         },

         height: {
            'header-client': '58px',
         },

         padding: {
            small: '4px 8px',
            medium: '5px 15px',
            large: '7px 21px',
         },

         colors: {
            // background: '#f6f6f6',

            black: '#232734',

            active: '#bd0000',

            border: 'hsl(var(--border))',
            input: 'hsl(var(--input))',
            ring: 'hsl(var(--ring))',
            background: 'hsl(var(--background))',
            foreground: 'hsl(var(--foreground))',
            primary: {
               DEFAULT: 'hsl(var(--primary))',
               foreground: 'hsl(var(--primary-foreground))',
            },
            secondary: {
               DEFAULT: 'hsl(var(--secondary))',
               foreground: 'hsl(var(--secondary-foreground))',
            },
            destructive: {
               DEFAULT: 'hsl(var(--destructive))',
               foreground: 'hsl(var(--destructive-foreground))',
            },
            muted: {
               DEFAULT: 'hsl(var(--muted))',
               foreground: 'hsl(var(--muted-foreground))',
            },
            accent: {
               DEFAULT: 'hsl(var(--accent))',
               foreground: 'hsl(var(--accent-foreground))',
            },
            popover: {
               DEFAULT: 'hsl(var(--popover))',
               foreground: 'hsl(var(--popover-foreground))',
            },
            card: {
               DEFAULT: 'hsl(var(--card))',
               foreground: 'hsl(var(--card-foreground))',
            },
         },

         boxShadow: {
            button:
               '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
            'header-client': '0 4px 4px rgba(0,0,0,.05)',
            submenu: '0 4px 10px rgba(0,0,0,.1)',
         },

         keyframes: {
            'accordion-down': {
               from: { height: '0' },
               to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
               from: { height: 'var(--radix-accordion-content-height)' },
               to: { height: '0' },
            },
         },

         animation: {
            'accordion-down': 'accordion-down 0.2s ease-out',
            'accordion-up': 'accordion-up 0.2s ease-out',
         },
      },
   },
};

export default config;
