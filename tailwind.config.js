/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },
        colors: {
            transparent: 'transparent',
            primary: '#5EEAD4',
            black: '#000',
            white: '#fff',
            gray: {
                50: '#f9fafb',
                100: '#f3f4f6',
                200: '#e5e7eb',
                300: '#d1d5db',
                400: '#9ca3af',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#1f2937',
                900: '#111827',
            },
            red: {
                500: '#ef4444',
                600: '#ea580c',
                700: '#b91c1c',
            },
            slate: {
                800: '#1e293b',
            },
        },
        backgroundColor: (theme) => theme('colors'),
        fontFamily: {},
        extend: {
            backgroundImage: {
                'main-image': "url('assets/images/img_bg.jpg')",
            },
        },
        variants: {
            backgroundColor: ['responsive', 'hover', 'focus', 'dark', 'active'],
        },
    },
    plugins: [],
};
