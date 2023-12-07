import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        screens: {
            xs: '375px',
            // => @media (min-width: 375px) { ... }

            sm: '576px',
            // => @media (min-width: 576px) { ... }

            md: '768px',
            // => @media (min-width: 768px) { ... }

            lg: '992px',
            // => @media (min-width: 992px) { ... }

            xl: '1200px',
            // => @media (min-width: 1200px) { ... }

            '2xl': '1400px',
            // => @media (min-width: 1400px) { ... }
            '3xl': '1600px',
            // => @media (min-width: 1600px) { ... }
            '4xl': '1800px',
            // => @media (min-width: 1800px) { ... }
        },
        extend: {
            colors: {
                bluePrimary: '#407CE2',
                boldBlue: '#223A6A',
                lightBlue: '#ebeff5',
            },
            backgroundImage: {},
        },
    },
    plugins: [],
};
export default config;
