/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.tsx", "./src/screens/**/*.tsx", "./src/components/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: '#FE877C',
        gradientStart: '#FF7074',
        gradientEnd: '#FEA085',
        gray50: '#FAFAFA',
        gray100: '#F5F5F5',
        gray200: '#EEEEEE',
        gray300: '#E0E0E0',
        gray400: '#BDBDBD',
        gray500: '#9E9E9E',
        gray600: '#757575',
        gray700: '#616161',
        gray800: '#424242',
        gray900: '#212121',
      },
      fontFamily: {
        "font-regular": 'SFPro-Regular',
        "font-medium": 'SFPro-Medium',
        "font-semibold": 'SFPro-SemiBold',
        "font-bold": 'SFPro-Bold'
      }
    },
  },
  plugins: [],
}

