/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: "media",
    theme: {
        extend: {},
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#f5f5f5',
                    secondary: '#34495e',
                    accent: '#FFA500',
                    neutral: '#FFC0CB',
                    lightblue: '#d1ecf1',
                    lightgreen: '#d4edda',
                    textColor: '#2c3e50',
                    sendBtn: '#28a745',
                },
            },
            'dark',
            'cupcake',
        ],
    },
}
