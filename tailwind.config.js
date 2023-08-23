/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./HTML/*.html"],
  theme: {
    extend: {
      backgroundImage:
      {
        'heroImgLP': "url('../Assets/LandingPage/img/shutterstock_605013488.webp')",
        'heroImgGA': "url('../Assets/GalleryPage/img/wandmalerei.webp')",
      },

      spacing:
      {
        '100ViewHeight': '100vh',
        '90popupHeight': '90vh',
      },

      colors:
      {
        'RaiffeisenGelb': '#FBF315',
        'RaiffeisenSchwarz': '#000000',
        'RaiffeisenGrün': '#78BE21',
        'RaiffeisenGrau': '#53565A',

        'RaiffeisenGrafikblau100': '#205095',

        'RaiffeisenGrafikgrau60': '#B4B4B4',
        'RaiffeisenGrafikgrau20': '#E7E7E7',

        'Raiffeisen-Störer-Violett': '#6C4796',
      },

      fontSize:
      {
        'heroDynamic': '3.5vw',
        'heroBtnDynamic': '1.5vw',
        'headerDynamic': '0.1vw',
      },

      fontFamily:
      {
        tt0001m: "tt0001m",
        tt0003m: "tt0003m",
        tt0100m: "tt0100m",
        tt0372m: "tt0372m",
        tt0373m: "tt0373m",
        tt0759m: "tt0759m",
      },

      scale:
      {
        'scaleLogo': '0.99',
      },

      screens:
      {
        1700: '1700px',
        1500: '1500px',
        1000: '1000px',
        950:  '950px',
        750:  '750px',
        640:  '650px',
        550:  '550px',
        450:  '450px',
        375:  '375px',
        320:  '320px',
        300:  '300px',
      },
    },
  },
  plugins: [],
}

